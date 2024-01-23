import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    create(@Body() credentialsDto: CredentialsDto): Promise<void> {
        return this.authService.signUp(credentialsDto);
    }

    @Post('login')
    logIn(@Body() credentialsDto: LoginCredentialsDto): Promise<{ accessToken }> {
        return this.authService.signIn(credentialsDto);
    }
}

