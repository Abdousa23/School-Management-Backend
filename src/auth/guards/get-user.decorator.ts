import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { User } from "src/user/user.schema";

export const GetUser = createParamDecorator(
    (_data:unknown,ctx:ExecutionContext):User=>{
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)