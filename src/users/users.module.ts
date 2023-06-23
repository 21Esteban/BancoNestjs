import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  //importamos la entidad a este modulo para que el service y el controller puedan acceder a el
  imports:[TypeOrmModule.forFeature([User])],
  // Este módulo utiliza el forFeature()método para definir qué repositorios están registrados en el ámbito actual. Con eso en su lugar, podemos inyectar el UsersRepositoryusando UsersServiceel @InjectRepository()decorador:

  //*Como vamos a usar un metodo autenticacion , vamos a exportar el servicio par ausarlo en authModule
  exports:[UsersService]
})
export class UsersModule {}
