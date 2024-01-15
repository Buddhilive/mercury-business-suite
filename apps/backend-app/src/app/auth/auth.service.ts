import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJwt(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<unknown | boolean> {
        return of<unknown | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
