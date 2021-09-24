const copyFilesTree = require('./index');

const filesData = {
    'source-folder-path': {
        foldersAndFiles: ['1.png'],
        destination: 'destination-folder-path',
        options: {
            allDirectories: true
        }
    },
    'source-folder-path': {
        foldersAndFiles: ['1.png', '2.png'],
        destination: 'destination-folder-path'
    },
    'source-folder-path': {
        destination: 'destination-folder-path',
        options: {
            allFiles: true,
            allDirectories: true
        }
    }
};

// Async operation
copyFilesTree.copyFiles(filesData).then(err => {
    if (err) console.log(err);
});

// ES6+
(async () => {
    const error = await copyFilesTree.copyFiles(filesData)
})();

// Sync operation
copyFilesTree.copyFilesSync(filesData);
