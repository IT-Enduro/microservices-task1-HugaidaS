import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('cinema/:cinemaUid/films/:filmUid')
  async buyTicket(
    @Param('cinemaUid') cinemaUid: string,
    @Param('filmUid') filmUid: string,
    @Body('date') date: Date,
    @Body('row') row: number,
    @Body('seat') seat: number,
    @Headers('X-User-Name') user_name: string,
    @Res() res,
  ) {
    const ticket = await this.ticketsService.create(
      cinemaUid,
      filmUid,
      date,
      row,
      seat,
      user_name,
    );

    res.set('Location', `/api/v1/tickets/${ticket.ticketUid}`);
    return res.status(201).send(ticket);
  }

  @Get(':ticketUid')
  async findOne(@Param('ticketUid') ticketUid: string) {
    return await this.ticketsService.findOne(ticketUid);
  }

  @Delete(':ticketUid')
  @HttpCode(204)
  async remove(@Param('ticketUid') ticketUid: string) {
    const result = await this.ticketsService.remove(ticketUid);
    if (typeof result === 'string' && result === 'Timeout') {
      return ConflictException;
    } else {
      return result;
    }
  }
}
