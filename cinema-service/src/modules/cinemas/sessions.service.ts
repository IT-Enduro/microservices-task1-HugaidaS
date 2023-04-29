import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilmSession } from '../../models/film-session.model';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(FilmSession) private sessionModel: typeof FilmSession,
  ) {}

  async findAllFilmUIDsByCinemaId(id: number): Promise<any> {
    const sessions = await this.sessionModel.findAll({
      where: {
        cinema_id: id,
      },
      attributes: ['filmUid'],
    });
    return sessions.map((session) => session.filmUid);
  }

  async bookSeat(filmUid: string, cinemaId: number) {
    const session = await this.sessionModel.findOne({
      where: {
        filmUid: filmUid,
        cinema_id: cinemaId,
      },
    });

    const bookedSeats = session.booked_seats;
    const totalSeats = session.total_seats;
    const new_value = bookedSeats + 1;

    if (new_value > totalSeats) {
      return {
        message: 'No seats available',
      };
    }

    const updated_session = await session.update({
      booked_seats: new_value,
    });

    if (updated_session) {
      return {
        message: 'Seat booked',
        sessionUid: session.session_uid,
      };
    }
  }
}
