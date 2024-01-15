import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/schema/user.entity';
import { Repository } from 'typeorm';
import { User } from '../shared/interfaces/user.interface';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        private authService: AuthService
    ) { }

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                return from(this.userRepo.save(newUser)).pipe(
                    map((user: User) => {
                        const newUserObj = {...user};
                        delete newUserObj.password
                        return newUserObj;
                    }),
                    catchError(err => throwError(err))
                )
            })
        );
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepo.findOne({ where: { id } })).pipe(
            map((user: User) => {
                const newUser = { ...user };
                delete newUser.password;
                return newUser;
            })
        );
    }

    findAll(): Observable<User[]> {
        return from(this.userRepo.find()).pipe(
            map((users: User[]) => {
                users.forEach((item: User) => delete item.password);
                return users;
            })
        );
    }

    deleteOne(id: number): Observable<unknown> {
        return from(this.userRepo.delete(id));
    }

    updateOne(id: number, user: User): Observable<unknown> {
        delete user.email;
        delete user.password;
        return from(this.userRepo.update(id, user));
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJwt(user).pipe((jwt) => jwt);
                } else {
                    return "Email or Password incorrect!";
                }
            })
        );
    }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByEmail(email).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((isAuthorized: boolean) => {
                    if (isAuthorized) {
                        const newUser = { ... user };
                        delete newUser.password;
                        return newUser;
                    } else {
                        throw Error;
                    }
                })
            ))
        );
    }

    findByEmail(email: string): Observable<User> {
        return from(this.userRepo.findOne({where: {email}}));
    }
}
