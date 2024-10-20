import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  // 注入 DbService 以进行数据库操作
  @Inject(DbService)
  dbService: DbService;

  // 用户注册方法
  async register(registerUserDto: RegisterUserDto) {
    // 从数据库读取所有用户
    const users: User[] = await this.dbService.read();

    // 检查用户名是否已存在
    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    // 如果用户名已存在，抛出异常
    if (foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    // 创建新用户对象
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    // 将更新后的用户列表写入数据库
    await this.dbService.write(users);

    // 返回新创建的用户对象
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );

    if (!foundUser) {
      throw new BadRequestException('用户不存在');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码不正确');
    }

    return foundUser;
  }
}
