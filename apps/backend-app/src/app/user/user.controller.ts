import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() user: User): Observable<User | object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({err: err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { accessToken: jwt };
            })
        );
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<unknown> {
        return this.userService.updateOne(Number(id), user);
    }
}
