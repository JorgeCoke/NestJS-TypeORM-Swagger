import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoteModule } from './modules/note/note.module';
import { NoteController } from './modules/note/note.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Config } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(Config.db), NoteModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    //Middleware configuration
    consumer.apply(AuthMiddleware)
      .with('AuthMiddleware')
      .forRoutes(NoteController);
  }
}
