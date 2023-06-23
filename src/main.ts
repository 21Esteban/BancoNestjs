import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {ValidationPipe,Logger} from "@nestjs/common"


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter({logger:true}));

  //Paquete de validacion automatica
  app.useGlobalPipes(new ValidationPipe())
  // Ahora podemos agregar algunas reglas de validación en nuestro archivo CreateUserDto. Hacemos esto usando decoradores provistos por el class-validatorpaquete, descritos en detalle aquí . De esta manera, cualquier ruta que use CreateUserDtoautomáticamente aplicará estas reglas de validación.


  const logger = new Logger('bootstrap')

  await app.listen(process.env.PORT,process.env.HOST);

  logger.log(`servidor corriendo por el puerto ${process.env.PORT} y host ${process.env.HOST}`);
  
}
bootstrap();
