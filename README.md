# copy-files

Copy files and folders to a wanted destination.  
This is the next generation of [copy-files-tree](https://github.com/GoorLavi/copy-files-tree) package

## Getting Started

To install package using npm
```
npm install --save copy-files-rev
```
Or with yarn
```
yarn add copy-files-rev
```

### How to use?
##### Sync usage: 

```js
import {copyFilesSync} from 'copy-files-rev'

const error = copyFilesSync(FoldersData);
```  

##### Async usage: 
```js
import {copyFiles} from 'copy-files-rev'

(async () => {
   const error = await copyFiles(FoldersData);
})()
```

## Props

- `FoldersData` `<Object>`
  
  - `Key` `<String>` Folder source path 
  
  - `Value` `<Object>` Folder data    
  
    - `foldersAndFiles` `<Array>` Of `<String>` should contain the folders/files names you want to copy from the `Key` path 

    - `destination` `<String>` Destination folder path
    
    - `options` `<Object>` This field is optional
    
      - `allFiles` `<boolean>` Default `false`, use true in case you want to copy all the files in  the `Key` path 

      - `allDirectories` `<boolean>` Default `false`, use true in case you want to copy all the folders in  the `Key` path 



### Example:   

```js
import {copyFiles} from 'copy-files-rev'

const FoldersData = {
    '/Users/user1/folder-name-1': {
        foldersAndFiles: ['image.png', 'inner-folder-name1'],
        destination: '/Users/user1/some-folder-name',
    },
    '/Users/user2/folder-name-2': {
        options: {
            allFiles: true,  // Folder files [`file-name1.txt`, `file-name2.txt`]
        },
        destination: '/Users/user2/some-folder-name2'
    }
}

(async () => {
   const error = await copyFiles(FoldersData);
})()

```  

### Files Structure
```js
/Users/ ----- |
               - user1 --- folder-name-1 ---
              |                                 |
              |                                   -  'image.png'
              |                                 |
              |                                   - 'inner-folder-name1' // With all the inner files and folders
              |
              |
               - user2 --- folder-name-2 ---
                                                 |
                                                   - `file-name1.txt`
                                                 |
                                                   - `file-name2.txt`
                            
```
## Donations
Please don't hesitate to donate this package, and reaching me out.

[More Examples](example.js)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
