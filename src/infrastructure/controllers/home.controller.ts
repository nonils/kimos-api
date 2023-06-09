import { Controller, Get } from '@nestjs/common';

@Controller()
export default class HomeController {
  @Get('/')
  public async getHome(): Promise<string> {
    return 'Hello World!';
  }
}
