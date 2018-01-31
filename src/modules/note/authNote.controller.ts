import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from '../../entities/note.entity';
import { ApiUseTags, ApiImplicitBody, ApiResponse, ApiProduces, ApiImplicitParam, ApiConsumes, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/interface/errorResponse.interface';
import { Config } from '../../config';

@ApiUseTags('note')
@ApiBearerAuth()
@Controller('note')
export class AuthNoteController {

  constructor(private readonly noteService: NoteService) { }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiImplicitParam({ name: 'id'})
  @ApiOperation({ title: 'Borra una nota por id'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: null, isArray: false})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: ErrorResponse})
  async delete( @Param() params): Promise<void> {
    return this.noteService.delete(params.id).catch (err => {
      console.log(Config.redLog, `[ERROR] - ${this.constructor.name}:delete() -> `, err);
      throw new HttpException('Nota no borrada',HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
}
