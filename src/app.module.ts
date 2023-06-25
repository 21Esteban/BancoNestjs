import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

//Base de datos
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';




@Module({
  //vamos a inportar el Config module para usar variables de entorno globales

  // El código anterior cargará y analizará un .envarchivo desde la ubicación predeterminada (el directorio raíz del proyecto), fusionará pares clave/valor del .envarchivo con variables de entorno asignadas a process.env, y almacenará el resultado en una estructura privada a la que puede acceder a través de ConfigService. El forRoot()método registra el ConfigServiceproveedor, que proporciona un get()método para leer estas variables de configuración analizadas/fusionadas. Dado que @nestjs/configse basa en dotenv , utiliza las reglas de ese paquete para resolver conflictos en los nombres de variables de entorno. Cuando existe una clave tanto en el entorno de tiempo de ejecución como una variable de entorno (por ejemplo, a través de exportaciones de shell del sistema operativo como export DATABASE_USER=test) y en un .envarchivo, la variable de entorno de tiempo de ejecución tiene prioridad.

  //*Vamos a aplicar una validacion a esas variables de entorno

  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        HOST:Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'banco',
      // entities:[], con el autoloadentities , nestJs carga automaticamente las entidades 
      synchronize:true,
      autoLoadEntities:true

      //El forRoot()método admite todas las propiedades de configuración expuestas por el DataSourceconstructor del paquete TypeORM . Además, hay varias propiedades de configuración adicionales que se describen a continuación.

      // retryAttempts	Número de intentos de conexión a la base de datos (predeterminado: 10)
      // retryDelay	Retraso entre reintentos de conexión (ms) (predeterminado: 3000)
      // autoLoadEntities	Si true, las entidades se cargarán automáticamente (predeterminado: false)

      //! La opción autoLoadEntities: true en la configuración de TypeORM indica que se deben cargar automáticamente las entidades definidas en tu aplicación, por lo que no necesitas incluirlas manualmente en el array de entidades (entities) al configurar TypeORM.

      // Cuando autoLoadEntities está habilitado, NestJS buscará automáticamente las clases de entidades en los directorios especificados (generalmente en el directorio src) y las cargará dinámicamente durante la inicialización de TypeORM. Esto evita tener que enumerar manualmente todas las entidades en el array entities, lo que puede ser conveniente y ahorrar tiempo, especialmente en aplicaciones con un gran número de entidades.
      
      // Sin embargo, es importante tener en cuenta que la opción autoLoadEntities solo es compatible con la configuración por defecto de TypeORM. Si necesitas configuraciones más avanzadas o personalizadas para tus entidades, es posible que aún debas especificar manualmente las entidades en el array entities y desactivar autoLoadEntities.
      
      // En resumen, si utilizas autoLoadEntities: true, las entidades se cargarán automáticamente sin necesidad de incluirlas en el array entities, lo cual puede ser una forma más conveniente de gestionar las entidades en tu aplicación NestJS.

    }),
    UsersModule,
    AuthModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
