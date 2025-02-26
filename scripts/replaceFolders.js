const fs = require("fs-extra");
const path = require("path");

// 获取 patchs 文件夹的绝对路径
const patchsPath = path.join(__dirname, "../patchs");
// 获取 libs 文件夹的绝对路径
const libsPath = path.join(__dirname, "../libs");

async function replaceOrCopyFiles() {
  try {
    // 检查 patchs 文件夹是否存在
    if (!fs.existsSync(patchsPath)) {
      console.log("patchs 文件夹不存在");
      return;
    }

    // 确保 libs 文件夹存在，如果不存在则创建
    await fs.ensureDir(libsPath);

    // 递归遍历 patchs 文件夹下的所有文件和文件夹
    const traverseDirectory = async (currentPatchPath, currentLibPath) => {
      const files = await fs.readdir(currentPatchPath);

      for (const file of files) {
        const patchFilePath = path.join(currentPatchPath, file);
        const libFilePath = path.join(currentLibPath, file);

        const fileStat = await fs.stat(patchFilePath);

        if (fileStat.isDirectory()) {
          // 如果是文件夹，递归遍历
          await fs.ensureDir(libFilePath);
          await traverseDirectory(patchFilePath, libFilePath);
        } else {
          // 如果是文件，检查 libs 中是否存在相同路径的文件
          if (fs.existsSync(libFilePath)) {
            // 如果存在，替换文件
            await fs.copy(patchFilePath, libFilePath, { overwrite: true });
            console.log(`已替换文件: ${libFilePath}`);
          } else {
            // 如果不存在，直接复制文件
            await fs.copy(patchFilePath, libFilePath);
            console.log(`已复制文件: ${libFilePath}`);
          }
        }
      }
    };

    await traverseDirectory(patchsPath, libsPath);

    console.log("所有文件替换/复制完成");
  } catch (error) {
    console.error("处理文件时出错:", error);
  }
}

// 调用主函数
replaceOrCopyFiles();
