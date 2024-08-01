import { Injectable,Dependencies, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "src/utils/role.enum";


@Injectable()
@Dependencies(Reflector)
export class RolesGuard{
    constructor(private reflector:Reflector){
    }
    
    canActivate(context:ExecutionContext):boolean{
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!requiredRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role:Role)=>user.roles?.includes(role))
    }

}