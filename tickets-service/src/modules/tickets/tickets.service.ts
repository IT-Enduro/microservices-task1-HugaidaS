import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import * as crypto from 'crypto';
import { Ticket } from 'src/models/ticket.model';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket) private ticketModel: typeof Ticket,
    private readonly httpService: HttpService,
  ) {}
  async create(
    cinemaUid: string,
    filmUid: string,
    date: Date,
    row: number,
    seat: number,
    user_name: string,
  ) {
    const response = await this.httpService.axiosRef.post(
      `http://cinema-service:8060/api/v1/cinema/${cinemaUid}/${filmUid}/book`,
    );
    const message = response.data.message;
    const sessionUid = response.data.sessionUid;

    if (message === 'Seat booked') {
      return await this.ticketModel.create({
        sessionUid: sessionUid,
        status: 'BOOKED',
        ticketUid: crypto.randomUUID(),
        filmUid: filmUid,
        user_name: user_name,
        date: date,
        row: row,
        seat: seat,
      });
    }
  }
  async findOne(uid: string) {
    return await this.ticketModel.findOne({
      where: {
        ticketUid: uid,
      },
    });
  }
  async remove(uid: string) {
    const ticket = await this.ticketModel.findOne({
      where: { ticketUid: uid },
    });

    const now = new Date().getTime();
    const ticketDate = new Date(ticket.date).getTime();

    let diff = (now - ticketDate) / 1000;
    diff /= 60 * 60;
    const diff_hours = Math.abs(Math.round(diff));

    if (diff_hours < 1) {
      return 'Timeout';
    } else {
      return await this.ticketModel.update(
        { status: 'CANCELED' },
        { where: { ticketUid: uid } },
      );
    }
  }
}
