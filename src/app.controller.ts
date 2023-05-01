import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Render('home')
  @Get('/home')
  public index(@Query('name') name?: string) {
    return { name };
  }

}
