import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Response, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { FastifyReply } from 'fastify';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginUserDto:LoginUserDto,@Response() reply:FastifyReply): Promise<any> {
    const user = await this.authService.login(reply,loginUserDto);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    //si todo sale bien , en user vamos a almacenar el user 
    return user;
  }
}

//la funcion validate va a recibir el dto de login , es una funcion que va a llamar la funcion que tenemos en el userService , lo que pasa es que esta funcion tiene una validacion de que si no hay un usuario o si al buscar en la base de dtos la funcion o el retorno de user nos da null  lanza una exception , el caso con eso es que ya la funcion que llamamos y tiene esa validacion por lo que no es necesaria la validacion 


// La mayor parte del trabajo de validación se realiza en nuestro AuthService(con la ayuda de nuestro UsersService), por lo que este método es bastante sencillo. El validate()método para cualquier estrategia de Passport seguirá un patrón similar, variando solo en los detalles de cómo se representan las credenciales. Si se encuentra un usuario y las credenciales son válidas, se devuelve al usuario para que Passport pueda completar sus tareas (por ejemplo, crear la userpropiedad en el Requestobjeto) y la canalización de manejo de solicitudes puede continuar. Si no se encuentra, lanzamos una excepción y dejamos que nuestra capa de excepciones la maneje.