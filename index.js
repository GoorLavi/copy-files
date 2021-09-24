const fs = require('fs-extra');
const expandHomeDir = require('expand-home-dir')

const softenPath = p => expandHomeDir(p);

const getAllFilteredItems = (path, isAllDirectory, isAllFiles) => {
    return (fs.readdirSync(path) || []).filter(item => {
        const isDirectory = fs.statSync(`${path}/${item}`).isDirectory();
        return (isDirectory && isAllDirectory || !isDirectory && isAllFiles);
    });
};

const copyItemsSync = ({
                           items,
                           destination,
                           sourceDirPath
                       }) =>
    items.forEach(item =>
        fs.copySync(`${sourceDirPath}/${item}`, `${destination}/${item}`)
    );

const copyItems = ({items, destination, sourceDirPath}) =>
    items.map(item =>
        new Promise((resolve, reject) => {
            fs.copy(`${sourceDirPath}/${item}`, `${destination}/${item}`, err => {
                if (err)
                    reject(err);
                resolve();
            });
        })
    );


const getItems = ({sourceDirPath, value}) => {
    const {
        options: {
            allFiles,
            allDirectories
        } = {},
        foldersAndFiles = []
    } = value;

    const filteredItems = getAllFilteredItems(sourceDirPath, allDirectories, allFiles);
    return foldersAndFiles.concat(filteredItems);
}

const copyFilesSync = filesData => {
    try {
        for (let [sourceDirPath, value] of Object.entries(filesData)) {
            try {
                const {destination} = value || {};
                if (!destination)
                    throw 'Item must have destination';

                const softenSourceDirPath = softenPath(sourceDirPath)
                const items = getItems({sourceDirPath: softenSourceDirPath, value});

                copyItemsSync({
                    items,
                    destination: softenPath(destination),
                    sourceDirPath: softenSourceDirPath
                });
            } catch (error) {
                console.error('Error copy items ', error);
                return error;
            }
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

const copyFiles = async filesData => {

    try {
        let allPromises = [];

        for (let [sourceDirPath, value] of Object.entries(filesData)) {
            try {
                const {destination} = value || {};
                if (!destination)
                    throw 'Item must have destination';

                const softenSourceDirPath = softenPath(sourceDirPath)
                const items = getItems({sourceDirPath: softenSourceDirPath, value});

                allPromises = allPromises.concat(copyItems({
                    items,
                    destination: softenPath(destination),
                    sourceDirPath: softenSourceDirPath
                }));
            } catch (error) {
                console.error('Error copy items ', error);
                return error;
            }
        }

        await Promise.all(allPromises);
    } catch (error) {
        console.error(error);
        return error;
    }
};

module.exports = {
    copyFilesSync,
    copyFiles
};
