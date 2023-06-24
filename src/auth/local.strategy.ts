import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Response, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { FastifyReply } from 'fastify';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

//Esto es simplemente un sevicio , que si recordamos , un servicio es una clase que se expota , decorada con el injectable

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', //username field (lo colocamos asi porque por defecto laestrategia por defecto viene configurada con el username , pero nosotros vamos a usar el email)
      passwordField: 'password',
    });
  }

  async validate(email:string,password:string): Promise<any> {
    const user = await this.authService.validateUser(email,password);
    console.log("entre a la localStrategy funcion validate me encargo de guardar el usuario, y valido si ese retorno de validateUser es nulo o no de acuerdo a eso mi funcion es responder al cliente con un error , pero si no , retorno el user para el controlador de login en authLogin" );
    if (!user) {
      throw new UnauthorizedException('contraseña o email incorrecto');
    }
    //si todo sale bien , en user vamos a almacenar el user 
    return user;
  }
}

//la funcion validate va a recibir el dto de login , es una funcion que va a llamar la funcion que tenemos en el userService , lo que pasa es que esta funcion tiene una validacion de que si no hay un usuario o si al buscar en la base de dtos la funcion o el retorno de user nos da null  lanza una exception , el caso con eso es que ya la funcion que llamamos y tiene esa validacion por lo que no es necesaria la validacion 


// La mayor parte del trabajo de validación se realiza en nuestro AuthService(con la ayuda de nuestro UsersService), por lo que este método es bastante sencillo. El validate()método para cualquier estrategia de Passport seguirá un patrón similar, variando solo en los detalles de cómo se representan las credenciales. Si se encuentra un usuario y las credenciales son válidas, se devuelve al usuario para que Passport pueda completar sus tareas (por ejemplo, crear la userpropiedad en el Requestobjeto) y la canalización de manejo de solicitudes puede continuar. Si no se encuentra, lanzamos una excepción y dejamos que nuestra capa de excepciones la maneje.