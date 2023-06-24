import {
  Controller,
  Post,
  Response,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  //inyectmos los metodos de AuthService
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // signIn(@Response() reply:FastifyReply,@Body() LoginUserDto:LoginUserDto){
  //     return this.authService.login(reply,LoginUserDto)
  // }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  //pero por que tenemos un decorador de autenticación para un login , no tiene mucho sentido , por que ? Lo que nos permite esto es proteger nuestro controlodor , el localPassport nos sirvio para que primero antes de llegar esa peticion al controlador y se ejecutara la logica , primero se valida si lo que nos llega(email,password) se encuentra en la base de datos , si no , no dejamos que llegue esa peticion al controlador

  //     Sí, tu explicación es correcta. El uso del decorador de autenticación (@UseGuards) en el endpoint de login tiene sentido en el contexto de la protección del controlador.

  // Cuando se utiliza el decorador @UseGuards con LocalAuthGuard, estás indicando que se debe aplicar una estrategia de autenticación local (probablemente basada en nombre de usuario y contraseña) antes de que se ejecute la lógica del controlador.

  // En este caso, el objetivo es asegurarse de que el usuario que intenta hacer login esté autenticado antes de permitir que se ejecute el código del controlador. Si las credenciales proporcionadas por el usuario coinciden con las almacenadas en la base de datos, LocalAuthGuard permitirá que la solicitud llegue al controlador. De lo contrario, se bloqueará la solicitud y no se ejecutará la lógica del controlador.

  // En resumen, el uso del decorador de autenticación en el endpoint de login ayuda a proteger el controlador y garantiza que solo los usuarios autenticados puedan acceder a él. Esta es una práctica común en el diseño de API seguras y evita que usuarios no autenticados accedan a funciones y datos sensibles.
  @Post('login')
  login(@Req() req: any,@Response() reply:FastifyReply) {
    console.log(
      'entre a la de authcontroller login despues de pasar por todas esas validaciones , retorno el usuario al cliente',
    );
    return this.authService.login(req.user,reply)
  }

  
}
