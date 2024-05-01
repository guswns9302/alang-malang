import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RankService } from './rank.service';
import { CreateRankDto } from './dto/create-rank.dto';
import { RankByGameRes } from './dto/rankByGameRes';
import { RankByUserRes } from './dto/rankByUserRes';

@Controller('rank')
export class RankController {
  constructor(private rankService: RankService) {}

  @Post()
  create(@Body() createRankDto: CreateRankDto): Promise<RankByGameRes[]> {
    return this.rankService.create(createRankDto);
  }

  @Get(':userId')
  getRank(@Param('userId') userId: string): Promise<RankByUserRes[]> {
    return this.rankService.getRankByUser(userId);
  }

  @Delete(':userId')
  refreshRank(@Param('userId') userId: string) {
    return this.rankService.refresh(userId);
  }
}
