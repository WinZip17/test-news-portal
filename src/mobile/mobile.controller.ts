import { Controller, Get } from '@nestjs/common';

@Controller({ host: `mobile.${process.env.APP_HOST}` })
export class MobileController {
  @Get()
  index(): string {
    return 'mobile version';
  }
}
