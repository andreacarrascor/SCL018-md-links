import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
const route = process.argv[2];

const absOrRel = (route) => path.isAbsolute(route) ? route : path.resolve(route);
const fileOrDir = (path) => fs.lstatSync(path).isDirectory() ? 'directory' : 'file';
const readFile = (file) => path.extname(file) === '.md' ? fs.readFileSync(file, 'utf8') : '\nInvalid format';

const getLinks = (file) => {
    const matchLinks = file.matchAll(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi);
    let dataLinks = [];
    for (const match of matchLinks) {
        const data = { text: match[1], href: match[2], file: route }
        dataLinks.push(data);
    }
    return dataLinks;
};

const validateLinks = (links) => {
    const validation = links.map((link) =>
        fetch(link.href).then((response) => {
            return { text: link.text, href: link.href, file: link.file, status: response.status, ok: response.statusText };
        })
    );
    return Promise.all(validation);
};

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        const newPath = absOrRel(path);
        fs.existsSync(path) ? newPath : reject(new TypeError('Argument is not valid'));
        if (fileOrDir(newPath) == 'file') {
            const read = readFile(newPath);
            const getLink = getLinks(read);
            options.validate ? resolve(validateLinks(getLink)) : resolve(getLinks(read));
        } 
    })
};

export { absOrRel, fileOrDir, readFile, getLinks, validateLinks, mdLinks };



