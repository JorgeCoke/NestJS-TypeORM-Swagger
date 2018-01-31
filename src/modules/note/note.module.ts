import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteAuthController } from './note.auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../../entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  components: [NoteService],
  controllers: [NoteController, NoteAuthController],
})
export class NoteModule { }
