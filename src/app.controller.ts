import { Controller, Get, Post, Body, Delete, Param, Patch, Res, Query, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'client', 'index.html');
    return res.sendFile(filePath);
  }

  @Get('db')
  checkDb() {
    return this.appService.checkConnection();
  }

  @Get('display')
  findAll(@Query('username') username: string) {
    return this.appService.findAll(username);
  }

  @Post('auth/login')
  async login(@Body() body: { username: string }) {
    return { success: true, username: body.username };
  }

  @Post('add')
  async insert(@Body() body: any) {
    return await this.appService.insert(body);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    await this.appService.delete(id);
    return { message: 'Deleted successfully' };
  }

  @Patch('star/:id')
  async star(@Param('id') id: number) {
    await this.appService.toggleStar(id);
    return { message: 'Star toggled' };
  }

  @Patch('toggle/:id')
  async toggle(@Param('id') id: number) {
    await this.appService.toggleComplete(id);
    return { message: 'Completion status toggled' };
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    return res.redirect(`/?username=${user.firstName}`);
  }
}
