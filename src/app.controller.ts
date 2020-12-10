import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async store(@Query('login') login: string, @Query('pass') pass: string, @Res() res: any) {
        const token: string = await this.appService.login(login, pass);
        if (token) {
            res.status(HttpStatus.OK).json({ token });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }
}
