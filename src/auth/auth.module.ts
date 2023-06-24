import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

//configurar token

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

//autorizacion local 

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // Estamos registrando el JwtModulecomo global para facilitarnos las cosas. Esto significa que no necesitamos importar JwtModuleningún otro lugar de nuestra aplicación.
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },

      //!Implementando la protección de autenticación #
      // Ahora podemos abordar nuestro requisito final: proteger los puntos finales al exigir que un JWT válido esté presente en la solicitud. Haremos esto creando un AuthGuardque podamos usar para proteger nuestras rutas.
    }),PassportModule ,UsersModule
  ],
})
export class AuthModule {}
