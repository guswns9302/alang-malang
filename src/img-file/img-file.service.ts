import { Injectable } from '@nestjs/common';
import { ImgFile } from './entities/img-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImgFileService {
  constructor(
    @InjectRepository(ImgFile)
    private ImgFileRepository: Repository<ImgFile>,
  ) {}
  async saveFile(filename: string, path: string): Promise<ImgFile> {
    const imgFile = new ImgFile();
    imgFile.filename = filename;
    imgFile.path = path;
    return this.ImgFileRepository.save(imgFile);
  }
}
