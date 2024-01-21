import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CredentialsDto } from "./dto/credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
    constructor(private datasource: DataSource) {
        super(UserEntity, datasource.createEntityManager());
    }

    async createUser(user: CredentialsDto): Promise<void> {
        const { email, username, password } = user;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await this.create({
            email: email,
            username: username,
            password: hashedPassword
        });

        try {
            await this.save(newUser);
        } catch (error) {
            // console.log(error);
            if (error.code === "23505") {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}