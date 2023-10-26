import { Public } from '@common/metadata';
import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Public()
@Controller()
export class AppController {
  constructor(private config: ConfigService) {}

  // @Post('sign-in')
  // async sendCodeByResponseJSON(@Req() req, @Res({passthrough: true}) res: Response) {
  //   try {
  //     const result = await this.casdoor.sdk.getAuthToken(req.query.code);

  //     const cookieExpDays = this.config.get<number>('COOKIE_EXPIRES');
  //     const cookieExpMili = cookieExpDays * 24 * 60 * 1000;
  //     const cookieExpMiliFromNow = Date.now() + cookieExpMili;

  //     const expiredTime = new Date(cookieExpMiliFromNow);

  //     res
  //       .cookie('token', result, {
  //         httpOnly: true,
  //         secure: false,
  //         sameSite: 'lax',
  //         expires: expiredTime,
  //       })
  //       .send({token: result});
  //   } catch (e) {
  //     return JSON.stringify({error: e});
  //   }
  // }
}
