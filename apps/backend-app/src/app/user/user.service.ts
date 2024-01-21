import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable, catchError, from } from 'rxjs';
import { SearchUserDto } from './dto/search-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UsersRepository
  ) { }

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepo.createUser(createUserDto);
  }

  findAll(): Observable<SearchUserDto[]> {
    return from(this.userRepo.find());
  }

  findOne(id: number): Observable<SearchUserDto> {
    return from(this.userRepo.findOne({ where: { id } })).pipe(
      catchError((err) => {
        throw new NotFoundException(err);
      })
    );
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<UpdateResult> {
    return from(this.userRepo.update(id, updateUserDto)).pipe(
      catchError((err) => {
        throw new NotFoundException(err);
      })
    );
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.userRepo.delete(id)).pipe(
      catchError((err) => {
        throw new NotFoundException(err);
      })
    );
  }
}
