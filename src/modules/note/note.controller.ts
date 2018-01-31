import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from '../../entities/note.entity';
import { ApiUseTags, ApiImplicitBody, ApiResponse, ApiProduces, ApiImplicitParam, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/interface/errorResponse.interface';
import { Config } from '../../config';

@ApiUseTags('note')
@Controller('note')
export class NoteController {

  constructor(private readonly noteService: NoteService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Obtiene la lista de Notas'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: Note, isArray: true})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: ErrorResponse})
  async findAll(): Promise<Note[]> {
    return await this.noteService.findAll().catch(err => {
      console.log(Config.redLog, `[ERROR] - ${this.constructor.name}:findAll() -> `, err);
      throw new HttpException('Notas no encontradas',HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiImplicitParam({ name: 'id'})
  @ApiOperation({ title: 'Obtiene una Nota por id'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: Note, isArray: false})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: ErrorResponse})
  async findById( @Param() params): Promise<Note> {
    return await this.noteService.findById(params.id).catch (err => {
      console.log(Config.redLog, `[ERROR] - ${this.constructor.name}:findById() -> `, err);
      throw new HttpException('Nota no encontrada',HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Guarda o actualiza una nota', description: 'Si el id de la nota existe, actualiza; si no se manda id, crea una nota nueva'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: Note, isArray: false})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: ErrorResponse})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: ErrorResponse})
  async create( @Body() Note: Note) :Promise<Note> {
    return await this.noteService.save(Note).catch (err => {
      console.log(Config.redLog, `[ERROR] - ${this.constructor.name}:create() -> `, err);
      throw new HttpException('Nota no creada',HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

}
