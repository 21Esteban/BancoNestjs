import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //         jwtFromRequest: proporciona el método mediante el cual se extraerá el JWT del archivo Request. Usaremos el enfoque estándar de proporcionar un token de portador en el encabezado de Autorización de nuestras solicitudes de API. Aquí se describen otras opciones .
      // ignoreExpiration: solo para ser explícitos, elegimos la falseconfiguración predeterminada, que delega la responsabilidad de garantizar que un JWT no haya caducado al módulo Passport. Esto significa que si nuestra ruta se proporciona con un JWT vencido, la solicitud será denegada y 401 Unauthorizedse enviará una respuesta. Passport maneja convenientemente esto automáticamente para nosotros.
      // secretOrKey: estamos utilizando la opción conveniente de proporcionar un secreto simétrico para firmar el token. Otras opciones, como una clave pública codificada con PEM, pueden ser más apropiadas para las aplicaciones de producción (consulte aquí para obtener más información). En cualquier caso, como se advirtió anteriormente, no exponga este secreto públicamente .

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  
  async validate(payload: any) {
    return payload;
  }
}

// 1. El cliente envía las credenciales de autenticación (por ejemplo, nombre de usuario y contraseña) al servidor.
// 2. El servidor verifica las credenciales y genera un token JWT firmado.
// 3. El token JWT se envía de vuelta al cliente y se almacena en el lado del cliente (por ejemplo, en las cookies o en el almacenamiento local).
// 4. En las solicitudes posteriores, el cliente incluye el token JWT en el encabezado de autorización.
// 5. El servidor recibe la solicitud y utiliza un guard JWT para verificar la validez y autenticidad del token.
// 6. Si el token es válido, el servidor permite el acceso a la ruta o recurso protegido y proporciona la respuesta correspondiente.
// 7. Si el token no es válido o ha expirado, el servidor rechaza la solicitud y devuelve un error de autenticación.


  