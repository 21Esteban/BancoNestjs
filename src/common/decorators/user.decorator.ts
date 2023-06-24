import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

//hacemos un decorador 

export const User =createParamDecorator((data:string,ctx:ExecutionContextHost)=>{
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user && user[data]: user
})