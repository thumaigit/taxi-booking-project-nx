import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Axios from 'axios';
import * as bcrypt from 'bcrypt';

export type UserReponse  = Omit<User, "user_password">;

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService
  ) {}


  getData(): { message: string } {
    return { message: 'Welcome to auth_service!' };
  }

  async findUser(phoneNumber: string): Promise<User> {
    const rootApi = `http://localhost:3000/api`;
    const response = await Axios.get<User>(
      `${rootApi}/${phoneNumber}/login`
    );
    return response.data;
  }

  async validateUser(username: string, pass: string): Promise<UserReponse> {
    const user = await this.findUser(username);
    const isPass = await bcrypt.compare(pass, user.user_password);
    if (isPass) {
      return user;
    }
    return null;
  }

  async login(user: UserReponse) {
    const payload = { username: user.phone_number, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
