/**
 * Reads a file from file input / drop on an element
 */
export default async ({ files } = {}) => {
    console.log('read files', files);
    return Promise.all([...files].map(readFile));
};

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            resolve(event.target.result);
        });
        reader.addEventListener('error', (err) => {
            reject(err);
        });
        reader.readAsText(file);
    });
};
