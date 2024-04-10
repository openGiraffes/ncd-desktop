const fs = require('fs');
const path = require('path');
 
function get_all_filepaths(dirPath) {
    const itemsData = {};

    function traverse_directory(currentPath) {
        const items = fs.readdirSync(currentPath);
 
        for (const item of items) {
            const itemPath = path.join(currentPath, item);
            const stat = fs.statSync(itemPath);
 
            if (stat.isFile()) {
                itemsData[itemPath] = {
                    isFile: stat.isFile(),
                    content: fs.readFileSync(itemPath).toString()
                }
            }
            if (stat.isDirectory()) {
                itemsData[itemPath] = {
                    isFolder: stat.isDirectory(),
                }
                traverse_directory(itemPath);
            }
        }
    }
 
    traverse_directory(dirPath);
    return itemsData;
}

export { get_all_filepaths }
