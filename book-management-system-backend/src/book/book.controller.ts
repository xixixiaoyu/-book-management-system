// 导入所需的模块和依赖
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage } from './my-file-storage';

// 定义图书控制器
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 获取所有图书列表
  @Get('list')
  async list() {
    return this.bookService.list();
  }

  // 根据 ID 查找特定图书
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(+id);
  }

  // 创建新图书
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // 更新图书信息
  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  // 删除指定 ID 的图书
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }

  // 上传图书封面图片
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 3, // 3MB
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('只允许上传 PNG、JPG 或 GIF 格式的图片'),
            false,
          );
        }
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('文件上传失败');
    }
    // 返回文件信息或者保存到数据库
    return {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
