import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SaveOptions } from 'typeorm';
import { Note } from '../../entities/note.entity';

@Component()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) { }

  async findById(id: string): Promise<Note> {
    return await this.noteRepository.findOneById(id);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async save(Note: Note): Promise<Note> {
    //Insert or Update
    return await this.noteRepository.save(Note);
  }

  async delete(id: number): Promise<void> {
    return await this.noteRepository.deleteById(id);
  }
}
