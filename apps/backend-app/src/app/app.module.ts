import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (soliasConfigService: ConfigService) => ({
        type: 'postgres',
        host: soliasConfigService.get('DB_HOST'),
        port: +soliasConfigService.get('DB_PORT'),
        username: soliasConfigService.get('DB_USER'),
        password: soliasConfigService.get('DB_PASS'),
        database: soliasConfigService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
  ],
  controllers: [AppController],
})
export class AppModule { }
