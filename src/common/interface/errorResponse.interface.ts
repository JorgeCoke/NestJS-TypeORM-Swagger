import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {

    @ApiModelProperty({description:'codigo de error'})
    statusCode: number;

    @ApiModelProperty({description:'descripcion del error'})
    message: string;

}