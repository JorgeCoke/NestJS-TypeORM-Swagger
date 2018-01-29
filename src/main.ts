import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import "reflect-metadata";
import * as express from 'express';
import * as helmet from 'helmet';
import * as morganBody from 'morgan-body';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { SwaggerDocument } from '@nestjs/swagger/interfaces';
import { Config } from './config';
import { HttpExceptionFilter } from './filter/http-exception.filter';


async function bootstrap() {

  const expressInstance = express();
  //Configuracion Express Instance
  expressInstance.use(helmet());          //Helmet
  expressInstance.use(bodyParser.json()); //Body Parser
  morganBody(expressInstance);            //Log every request body/response

  //Create NestJS APP
  const app = await NestFactory.create(ApplicationModule, expressInstance);
  
  //Global Route Prefix
  app.setGlobalPrefix(Config.GlobalRoutePrefix);

  //Validation Pipie
  app.useGlobalPipes(new ValidationPipe());

  //Http-Exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  //Swagger
  const options = new DocumentBuilder()
    .setBasePath(Config.GlobalRoutePrefix)
    .setTitle('Swagger example')
    .setDescription('The Swagger API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/${Config.GlobalRoutePrefix}${Config.docsRoute}`, app, document);
  //Generate .json API Documentation (easly import to Restlet Studio etc...)
  generateSwaggerJSONFile(document);

  //Start listening
  await app.listen(Config.Port,Config.IP,() => {
    console.log('|----------------------------------------------------------|')
    console.log(`|       Server listening: ${Config.apiUrl}       |`);
    console.log('|----------------------------------------------------------|')
    console.log(`| Swagger Documentation -> ${Config.apiUrl}${Config.docsRoute} |`);  
    console.log('|----------------------------------------------------------|')
  });
}

bootstrap();

async function generateSwaggerJSONFile(swaggerDocument: SwaggerDocument): Promise<void> {
  await fs.writeFile('./src/api/swagger2.json',JSON.stringify(swaggerDocument, null, 4),
      (err: NodeJS.ErrnoException) => {
          if(err) throw err;
      }
  );
}
