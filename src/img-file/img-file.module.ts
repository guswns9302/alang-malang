import { Module } from '@nestjs/common';
import { ImgFileService } from './img-file.service';
import { ImgFileController } from './img-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgFile } from './entities/img-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImgFile])],
  controllers: [ImgFileController],
  providers: [ImgFileService],
})
export class ImgFileModule {}
