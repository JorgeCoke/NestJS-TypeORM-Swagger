import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsBoolean, IsOptional } from 'class-validator';

@Entity()
export class Note {

  constructor(texto: string, activo: boolean, id?: number) {
    this.texto = texto;
    this.activo = activo;
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  @ApiModelPropertyOptional({ description: 'identificador de la nota' })
  @IsNumber()
  @IsOptional() //Si es Opcional, poner el decorator "IsOptional" al final, si no, no funciona correctamente
  id: number;

  @Column({ length: 500 })
  @ApiModelProperty({ description: 'texto de la nota' })
  @IsString()
  texto: string;

  @Column({ name: 'activo', default: true })
  @ApiModelProperty({ description: 'indica si la nota está activa' })
  @IsBoolean()
  activo: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

}
