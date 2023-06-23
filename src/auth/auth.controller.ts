import { Controller,Post,Response,Body,UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    //inyectmos los metodos de AuthService
    constructor(private authService:AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    signIn(@Response() reply:FastifyReply,@Body() LoginUserDto:LoginUserDto){
        return this.authService.login(reply,LoginUserDto)
    }
}