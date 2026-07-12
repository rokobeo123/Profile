import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SetupDto } from './dto/setup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async setup(dto: SetupDto) {
    let settings = await this.prisma.systemSettings.findUnique({
      where: { id: 'global' },
    });

    if (settings?.passwordHash) {
      throw new ConflictException('Owner password already set.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    if (!settings) {
      settings = await this.prisma.systemSettings.create({
        data: {
          id: 'global',
          passwordHash: hash,
        },
      });
    } else {
      settings = await this.prisma.systemSettings.update({
        where: { id: 'global' },
        data: { passwordHash: hash },
      });
    }

    return this.generateTokens();
  }

  async login(dto: LoginDto) {
    const settings = await this.prisma.systemSettings.findUnique({
      where: { id: 'global' },
    });

    if (!settings || !settings.passwordHash) {
      throw new BadRequestException('System not configured yet. Please setup first.');
    }

    const isMatch = await bcrypt.compare(dto.password, settings.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens();
  }

  private async generateTokens() {
    const payload = { sub: 'owner', role: 'owner' };
    
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
