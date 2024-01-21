import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadObject } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepo: AuthRepository,
        private jwtService: JwtService
    ) { }

    async signUp(credentialsDto: CredentialsDto): Promise<void> {
        await this.authRepo.createUser(credentialsDto);
    }

    async signIn(credentialsDto: LoginCredentialsDto): Promise<{ accessToken }> {
        const { username, password } = credentialsDto;

        const user = await this.authRepo.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const jwtPayload: JwtPayloadObject = { username };
            const jwtAccessToken = this.jwtService.sign(jwtPayload);
            return { accessToken: jwtAccessToken };
        } else {
            throw new UnauthorizedException('Username or Password is incorrect.');
        }
    }
}
