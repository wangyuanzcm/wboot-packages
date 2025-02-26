const { execSync } = require('child_process');
const path = require('path');
// 定义要执行的脚本路径
const replaceSrcPath = path.join(__dirname, 'replaceSrc.js');
const replaceFoldersPath = path.join(__dirname, 'replaceFolders.js');
// 定义要处理的文件夹路径
const libsPath = path.join(__dirname, '../libs');
// 定义要执行的命令数组
const commands = [
    `node ${replaceSrcPath} ${libsPath}`,
    `node ${replaceFoldersPath}`
];

for (const command of commands) {
    try {
        const output = execSync(command, { encoding: 'utf8' });
        console.log(`命令 ${command} 输出: ${output}`);
    } catch (error) {
        console.error(`执行命令 ${command} 时出错: ${error}`);
    }
}

console.log('所有命令执行完毕');