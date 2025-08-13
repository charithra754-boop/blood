import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, role: string = 'donor') {
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashed, role });
    await user.save();
    return { message: 'User registered successfully' };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) return null;
    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email, role: user.role },
    };
  }
}
