import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.timelineEvent.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.timelineEvent.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async create(data: any) {
    return this.prisma.timelineEvent.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.timelineEvent.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.timelineEvent.delete({ where: { id } });
  }
}
