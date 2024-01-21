import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

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

    @Post('test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        return `${req}`;
    }

}

