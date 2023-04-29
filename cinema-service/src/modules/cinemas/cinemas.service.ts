import { Injectable } from '@nestjs/common';
import { Cinema } from '../../models/cinema.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { SessionsService } from './sessions.service';

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinema) private cinemaModel: typeof Cinema,
    private readonly httpService: HttpService,
    private readonly sessionsService: SessionsService,
  ) {}

  async findAll(page = 1, size = 10): Promise<Cinema[]> {
    return await this.cinemaModel.findAll({
      limit: size,
      offset: (page - 1) * size,
    });
  }

  async findAllMoviesByCinemaUID(uid: string) {
    const cinema = await this.cinemaModel.findOne({
      where: {
        cinemaUid: uid,
      },
    });
    const film_UIDs = await this.sessionsService.findAllFilmUIDsByCinemaId(
      cinema.id,
    );

    const films = await this.httpService.axiosRef.post(
      `http://films-service:8070/api/v1/films/films-list`,
      { UIDs: film_UIDs },
    );

    return {
      name: cinema.name,
      address: cinema.address,
      films: films.data,
    };
  }

  async bookSeat(filmUid: string, cinemaUid: string) {
    const cinema = await this.cinemaModel.findOne({
      where: {
        cinemaUid: cinemaUid,
      },
    });
    return await this.sessionsService.bookSeat(filmUid, cinema.id);
  }
}
