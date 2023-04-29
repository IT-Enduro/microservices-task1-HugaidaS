import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async findAll(@Query('page') page, @Query('size') size): Promise<any> {
    const items = await this.filmsService.findAll(page, size);
    return {
      items: items,
      page: Number(page),
      pageSize: Number(size),
      totalElements: items.length,
    };
  }

  @Post('films-list')
  async findAllByIds(@Body('UIDs') UIDs) {
    return await this.filmsService.findAllByUIDs(UIDs);
  }
}
