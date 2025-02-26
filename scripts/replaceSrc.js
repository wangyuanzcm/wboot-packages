const fs = require('fs');
const path = require('path');

// 递归遍历文件夹
function traverseDirectory(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            traverseDirectory(filePath, callback);
        } else {
            callback(filePath);
        }
    });
}

// 替换文件中的引用路径
function replaceImportsInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const newContent = content.replace(/(import.*from\s+['"])(\/src\/)(.*?['"];)/g, (match, p1, p2, p3) => {
        return `${p1}/@/${p3}`;
    });
    if (newContent!== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`已替换文件: ${filePath}`);
    }
}

// 主函数
function main() {
    const targetDirectory = process.argv[2];
    if (!targetDirectory) {
        console.error('请提供一个文件夹路径作为参数。');
        return;
    }

    if (!fs.existsSync(targetDirectory) ||!fs.statSync(targetDirectory).isDirectory()) {
        console.error('提供的路径不是一个有效的文件夹。');
        return;
    }

    traverseDirectory(targetDirectory, replaceImportsInFile);
    console.log('所有文件处理完成。');
}

main();