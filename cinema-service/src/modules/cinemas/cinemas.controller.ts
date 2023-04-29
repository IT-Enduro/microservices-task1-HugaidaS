import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CinemasService } from './cinemas.service';

@Controller('cinema')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}
  @Get()
  async findAll(@Query('page') page, @Query('size') size): Promise<any> {
    const items = await this.cinemasService.findAll(page, size);
    return {
      items: items,
      page: Number(page),
      pageSize: Number(size),
      totalElements: items.length,
    };
  }

  @Get(':cinemaUid/films')
  async findAllMoviesByCinemaUID(@Param('cinemaUid') cinemaUid) {
    return await this.cinemasService.findAllMoviesByCinemaUID(cinemaUid);
  }

  @Post(':cinemaUid/:filmUid/book')
  async bookSeat(@Param('filmUid') filmUid, @Param('cinemaUid') cinemaUid) {
    return await this.cinemasService.bookSeat(filmUid, cinemaUid);
  }
}
