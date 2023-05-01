import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Film } from '../../models/film.model';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film) private filmModel: typeof Film) {}
  async findAll(page = 1, size = 10): Promise<Film[]> {
    return await this.filmModel.findAll({
      limit: size,
      offset: (page - 1) * size,
    });
  }

  async findAllByUIDs(UIDs: string[]): Promise<Film[]> {
    return await this.filmModel.findAll({
      where: {
        filmUid: UIDs,
      },
    });
  }
}
