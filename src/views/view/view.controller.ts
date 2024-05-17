import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@Controller('view')
export class ViewController {
  @Get()
  @Render('view.ejs')
  async rending() {}

  @Post()
  //@Render('view.ejs')
  async getAdmin(@Body() data: { code: string }, @Res() res: Response) {
    const server_code = 'AM_ADMIN_SERVER_CODE';
    if (data.code == server_code) {
      // 쿠키설정
      res.cookie('token', Math.random(), {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie('token2', Math.random(), {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: '알랑말랑 어드민 접속 환영해~', code: 1 });
    } else {
      return res
        .status(200)
        .json({ message: '접속 코드가 틀리자녀~', code: 0 });
    }
  }

  @Get('/admin')
  async admin(@Req() request: Request, @Res() res: Response) {
    let flag = false;
    const cookiesString = request.headers.cookie;
    if (cookiesString != undefined) {
      const cookies = cookiesString.split('; ');
      for (let i = 0; i < cookies!.length; i++) {
        const cookie = cookies![i].split('=');
        if (cookie[0] == 'token') {
          flag = true;
        }
      }
    }

    if (!flag) {
      return res.redirect('/api/view');
    }
    return res.render('admin.ejs');
  }

  @Post('/excel/upload/:topicId')
  @UseInterceptors(FileInterceptor('file'))
  async handleExcel(@UploadedFile() file, @Param('topicId') topicId: number) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];

    // 첫번째 sheet 를 사용합니다.
    const sheet = workbook.Sheets[sheetName];

    // sheet 의 정보를 json array 로 변환합니다.
    const rows = XLSX.utils.sheet_to_json(sheet, {
      // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
      defval: null,
    });

    return rows;
  }
}
