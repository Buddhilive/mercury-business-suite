import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

  create(createUserDto: CreateUserDto): Observable<CreateUserDto> {
    return from(this.userRepo.save(createUserDto));
  }

  findAll(): Observable<SearchUserDto[]> {
    return from(this.userRepo.find());
  }

  findOne(id: number): Observable<SearchUserDto> {
    return from(this.userRepo.findOne({ where: {id}}));
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<UpdateResult> {
    return from(this.userRepo.update(id, updateUserDto));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.userRepo.delete(id));
  }
}
