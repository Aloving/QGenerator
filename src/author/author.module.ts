import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';

@Module({
  exports: [AuthorService],
  providers: [AuthorService],
})
export class AuthorModule {}
