import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from "./auth.repository";
import { JwtPayloadObject } from "./interfaces/jwt-payload.interface";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authRepo: AuthRepository
    ) { 
        super({
            secretOrKey: 'namobuddhaya',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayloadObject): Promise<UserEntity> {
        const { username } = payload;
        const user = this.authRepo.findOne({ where: { username }});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}