import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import {
    CanActivate,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import Request from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from "./auth.public";
require('dotenv').config();

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector:Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) return true;
        
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException('Token not found')
        }
        try {

            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: process.env.JWT_SECRET }
            )
            request.user = payload

        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
        return true
    }
    private extractTokenFromHeader(request: Request): string {
        const [bearer, token] = request.headers['authorization'||'Authorization']?.split(' ')
        return bearer === 'Bearer' && token ? token : undefined
    }
}
