import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { DocumentRepository } from './docs.repository';
import { DocEntity } from './entities/doc.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class DocsService {

  constructor(private docsRepo: DocumentRepository) {}

  async create(createDocDto: CreateDocDto): Promise<DocEntity> {
    return await this.docsRepo.createDoc(createDocDto);
  }

  findAll() {
    return `This action returns all docs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doc`;
  }

  async update(id: number, updateDocDto: UpdateDocDto): Promise<UpdateResult> {
    return await this.docsRepo.update(id, updateDocDto);
  }

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
