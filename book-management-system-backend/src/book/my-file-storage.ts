// 导入所需的模块
import * as multer from 'multer';
import * as fs from 'fs';

// 配置 multer 的磁盘存储选项
const storage = multer.diskStorage({
  // 设置文件存储目录
  destination: function (req, file, cb) {
    try {
      // 尝试创建 uploads 目录，如果已存在则忽略错误
      fs.mkdirSync('uploads');
    } catch (e) {}

    // 指定文件存储的目录为 'uploads'
    cb(null, 'uploads');
  },
  // 设置文件名
  filename: function (req, file, cb) {
    // 生成唯一的文件名
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    // 使用生成的唯一文件名
    cb(null, uniqueSuffix);
  },
});

// 导出配置好的 storage 对象
export { storage };
