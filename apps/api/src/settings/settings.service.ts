import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.systemSettings.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.systemSettings.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async create(data: any) {
    return this.prisma.systemSettings.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.systemSettings.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.systemSettings.delete({ where: { id } });
  }
}
