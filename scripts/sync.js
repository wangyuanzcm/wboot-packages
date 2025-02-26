const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);

// 本地 build 文件夹路径
const localBuildPath = path.join(__dirname, '../build');
// 本地 libs 文件夹路径
const localLibsPath = path.join(__dirname, '../libs');

// 递归删除文件夹及其内容
async function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        const files = await readdir(folderPath);
        for (const file of files) {
            const curPath = path.join(folderPath, file);
            const fileStat = await stat(curPath);
            if (fileStat.isDirectory()) {
                await deleteFolderRecursive(curPath);
            } else {
                await unlink(curPath);
            }
        }
        await rmdir(folderPath);
    }
}

async function copyFolderRecursive(source, destination) {
    try {
        // 检查源文件夹是否存在
        if (!fs.existsSync(source)) {
            console.log(`源文件夹 ${source} 不存在`);
            return;
        }

        // 确保目标文件夹存在
        await mkdir(destination, { recursive: true });

        const files = await readdir(source);

        for (const file of files) {
            const sourceFilePath = path.join(source, file);
            const destFilePath = path.join(destination, file);

            const fileStat = await stat(sourceFilePath);

            if (fileStat.isDirectory()) {
                // 如果是文件夹，递归复制
                await copyFolderRecursive(sourceFilePath, destFilePath);
            } else {
                // 如果是文件，直接复制
                await copyFile(sourceFilePath, destFilePath);
            }
        }
    } catch (error) {
        console.error('复制文件夹时出错:', error);
    }
}

async function main(sourceFolderPath) {
    try {
        // 清理本地 build 文件夹
        await deleteFolderRecursive(localBuildPath);
        console.log('本地 build 文件夹已清理');

        // 清理本地 libs 文件夹
        await deleteFolderRecursive(localLibsPath);
        console.log('本地 libs 文件夹已清理');

        // 复制 build 文件夹到本地 build 文件夹
        const sourceBuildPath = path.join(sourceFolderPath, 'build');
        if (fs.existsSync(sourceBuildPath)) {
            await copyFolderRecursive(sourceBuildPath, localBuildPath);
            console.log('build 文件夹复制完成');
        } else {
            console.log('源文件夹中没有 build 文件夹');
        }

        // 复制 src 文件夹到本地 libs 文件夹
        const sourceSrcPath = path.join(sourceFolderPath, 'src');
        if (fs.existsSync(sourceSrcPath)) {
            await copyFolderRecursive(sourceSrcPath, localLibsPath);
            console.log('src 文件夹复制完成');
        } else {
            console.log('源文件夹中没有 src 文件夹');
        }
    } catch (error) {
        console.error('复制过程中出现错误:', error);
    }
}

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length === 0) {
    // 如果没有传入参数，提示用户输入文件夹路径
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('请输入要复制的源文件夹路径: ', (answer) => {
        main(answer);
        readline.close();
    });
} else {
    // 如果传入了参数，直接使用该参数作为源文件夹路径
    main(args[0]);
}