import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return "<div id='root'>Hello World<div>";
  }

  getSecret(): string {
    return 'вы раскрыли нашу тайну :(';
  }
}
