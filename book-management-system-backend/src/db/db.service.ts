import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  // 注入配置选项
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  // 读取文件内容
  async read() {
    const filePath = this.options.path;

    try {
      // 检查文件是否存在
      await access(filePath);
    } catch (e) {
      // 文件不存在时返回空数组
      return [];
    }

    // 读取文件内容
    const str = await readFile(filePath, {
      encoding: 'utf-8',
    });

    // 文件为空时返回空数组
    if (!str) {
      return [];
    }

    // 解析 JSON 字符串并返回
    return JSON.parse(str);
  }

  // 写入数据到文件
  async write(obj: Record<string, any>) {
    // 将对象转换为 JSON 字符串并写入文件
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
