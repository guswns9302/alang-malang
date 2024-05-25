import { ImgFileService } from './img-file.service';
import { Express } from 'express';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { Response } from 'express';
@Controller('img-file')
export class ImgFileController {
  constructor(private readonly imgFileService: ImgFileService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('ImgFile', {
      storage: diskStorage({
        destination: './uploads-imgFile',
        filename: (req, ImgFile, callback) => {
          const ext = extname(ImgFile.originalname);
          const filename = `${uuidv4()}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ filename: string; path: string; url: string }> {
    const savedFile = await this.imgFileService.saveFile(
      file.filename,
      file.path,
    );
    const downloadUrl = `http://localhost:3000/img-file/download/${savedFile.filename}`;
    return {
      filename: savedFile.filename,
      path: savedFile.path,
      url: downloadUrl,
    };
  }
  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = join(process.cwd(), 'uploads', filename);
    res.sendFile(filePath);
  }
}
