import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: '书名不能为空' })
  @IsString({ message: '书名必须是字符串' })
  name: string;

  @IsNotEmpty({ message: '作者不能为空' })
  @IsString({ message: '作者必须是字符串' })
  author: string;

  @IsNotEmpty({ message: '描述不能为空' })
  @IsString({ message: '描述必须是字符串' })
  description: string;

  @IsNotEmpty({ message: '封面不能为空' })
  @IsString({ message: '封面必须是字符串' })
  cover: string;
}
