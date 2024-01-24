import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { DocEntity } from "./entities/doc.entity";
import { CreateDocDto } from "./dto/create-doc.dto";

@Injectable()
export class DocumentRepository extends Repository<DocEntity> {
    constructor(private dataSource: DataSource) {
        super(DocEntity, dataSource.createEntityManager());
    }

    async createDoc(docz: CreateDocDto): Promise<DocEntity> {
        const newDoc = await this.create(docz);
        return await this.save(newDoc);
    }
}