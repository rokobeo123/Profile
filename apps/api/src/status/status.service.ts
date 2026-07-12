import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.currentStatus.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.currentStatus.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async create(data: any) {
    return this.prisma.currentStatus.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.currentStatus.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.currentStatus.delete({ where: { id } });
  }
}
