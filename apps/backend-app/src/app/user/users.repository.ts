import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(user: CreateUserDto): Promise<void> {
        const newUser = await this.create(user);
        await this.save(newUser);
    }
}