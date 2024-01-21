import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly authRepo: AuthRepository) { }

    async signUp(credentialsDto: CredentialsDto): Promise<void> {
        await this.authRepo.createUser(credentialsDto);
    }

    async signIn(credentialsDto: LoginCredentialsDto): Promise<string> {
        const { username, password } = credentialsDto;

        const user = await this.authRepo.findOne({ where: { username } });

        if(user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Username or Password is incorrect.');
        }
    }
}
