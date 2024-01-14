import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../shared/interfaces/user.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) {}

    create(user: User): Observable<User> {
        return from(this.userRepo.save(user));
    }

    findAll(): Observable<User[]> {
        return from(this.userRepo.find());
    }

    deleteOne(id: number): Observable<unknown> {
        return from(this.userRepo.delete(id));
    }

    updateOne(id: number, user: User): Observable<unknown> {
        return from(this.userRepo.update(id, user));
    }
}
