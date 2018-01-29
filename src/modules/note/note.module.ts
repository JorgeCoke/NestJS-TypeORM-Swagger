import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../../entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  components: [NoteService],
  controllers: [NoteController],
})
export class NoteModule { }
