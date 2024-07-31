import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/user.schema";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'at-jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('accessToken'),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
            passReqToCallback: false,
        })
    }

    async validate(payload: any): Promise<Partial<User>> {
        return payload;
      }
}