import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { DocumentRepository } from './docs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocEntity } from './entities/doc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocEntity])
  ],
  controllers: [DocsController],
  providers: [DocsService, DocumentRepository],
})
export class DocsModule {}
