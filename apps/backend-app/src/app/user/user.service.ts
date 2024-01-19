import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

  create(createUserDto: CreateUserDto): Observable<CreateUserDto> {
    return from(this.userRepo.save(createUserDto));
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<UpdateResult> {
    return from(this.userRepo.update(id, updateUserDto));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.userRepo.delete(id));
  }
}
