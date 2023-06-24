import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FastifyReply } from 'fastify';
import { response } from 'src/common/helpers/Response';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

//token
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

//* Implementando el endPoint "Iniciar sesión" #
// Nuestro AuthServicetiene el trabajo de recuperar un usuario y verificar la contraseña. Creamos un signIn()método para este propósito. En el código a continuación, usamos un conveniente operador de extensión ES6 para eliminar la propiedad de contraseña del objeto de usuario antes de devolverlo. Esta es una práctica común cuando se devuelven objetos de usuario, ya que no desea exponer campos confidenciales como contraseñas u otras claves de seguridad.
@Injectable()
export class AuthService {
  constructor(
    //inyectamos el repositorio ya que la funcion login la necesita
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userService: UsersService,

    //Para mantener nuestros servicios modularizados de forma limpia, nos encargaremos de generar el JWT en el archivo authService. Abra el auth.service.tsarchivo en la authcarpeta, inyecte el JwtServicey actualice el signInmétodo para generar un token JWT como se muestra a continuación:

    private jwtService: JwtService,
  ) {}

  // async login(reply: FastifyReply, loginUserDto: LoginUserDto) {
  //   try {
  //     const { email, password } = loginUserDto;
  //     const user = await this.usersRepository.findOne({ where: { email } });

  //     if (user && user.matchPassword(password)) {
  //!Token

  //? El token tiene 3 partes , encabezado (header), carga útil (payload) y firma (signature). como ya buscamos a el usuario y su clave coincide , entonces vamos a hacer el token , vamos a obtener el id de ese usuario para meterlo en el token , y tambien el nombre , recordemos que cuando se hace una peticion http el req trae un objeto con la informacion de esa peticion , como los headers o encabezados , el body , el params , etc

  //         Encabezado (Header): Es la primera parte del token y contiene información sobre el tipo de token y el algoritmo de firma utilizado. Por lo general, se representa en formato JSON y se codifica en Base64. El encabezado especifica el tipo de token, como JWT (JSON Web Token), y el algoritmo de firma utilizado, como HMAC, RSA o ECDSA.

  // Carga útil (Payload): Es la segunda parte del token y contiene los datos o la información adicional que se desea transmitir. Puede incluir información del usuario, como el identificador, nombre, roles u otros atributos. Al igual que el encabezado, la carga útil se representa en formato JSON y se codifica en Base64. La información contenida en esta parte puede ser verificada por el servidor de aplicaciones para tomar decisiones basadas en ella.

  // Firma (Signature): Es la tercera parte del token y se utiliza para verificar la autenticidad del token y garantizar que no haya sido manipulado. La firma se crea utilizando la clave secreta o privada del servidor de autenticación. El servidor que recibe el token puede verificar la firma utilizando la clave pública correspondiente para asegurarse de que el token no haya sido alterado durante la transmisión. La firma se agrega al token como una cadena de caracteres y se utiliza en la verificación de la integridad del token.

  //         const payload = {id:user.id,username:user.name}

  //         console.log(payload)

  //         const token =  this.jwtService.sign(payload)

  //         //Una vez hecho el token , toca configurar la firma del token y sus configuracion , creemos el archivo constants.ts en la auth carpeta

  //         return response(
  //           reply,
  //           200,
  //           true,
  //           { ...user, password: null, token },
  //           `Bienvenido ${user.name}`,
  //         );
  //       }
  //       response(reply, 400, false, '', 'email or password is incorrect');
  //     } catch (error) {
  //       return this.catch(reply, error, 'userService login');
  //     }
  //   }

  //   catch(reply: FastifyReply, error: any, nameFunction: string) {
  //     response(
  //       reply,
  //       500,
  //       false,
  //       null,
  //       `Ha ocurrido un error en ${nameFunction} , error : ${error}`,
  //     );
  //   }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    console.log(
      'entre al authService , funcion validateUse, mi funcion es buscar a el usuario por el email y comparar si la contraseña de ese usuario es la misma a la ingresda retorno el usuario',
    );
    if (user && user.matchPassword(password)) {
      return user;
    }
  }

  //Seguimos la documentacion y ahora hacemos un metodo de login

  async login(user: User, reply: FastifyReply) {
    try {
      const payload = { username: user.name, id: user.id };
      // console.log(user);
      const token = this.jwtService.sign(payload);
      return response(reply, 200, true,{...user,token}, 'Bienvenido');
    } catch (error: any) {
      response(
        reply,
        500,
        false,
        '',
        `Error en la funcion login de authService ${error.message}`,
      );
    }
  }
}
