import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { userRole } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { response } from 'src/common/helpers/Response';
import { FastifyReply } from 'fastify';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService,
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<userRole[]>(ROLES_KEY, [
      
      //obtiene los roles o metadatos que tiene un controlador o ruta
      context.getHandler(),
      //obtiene los roles o metadatos de la clase completa
      context.getClass(),
    ]);

    console.log("entre al roles.guard");
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const token = request.raw.rawHeaders[1].split(" ")[1];
    // const bearerToken = request.headers.authorization; otra forma de obtener el token
    
      const decoded = this.jwtService.verify(token)
      console.log(decoded);
      const roles = decoded.role
      console.log(roles);
      const hasRequiredRole  =  requiredRoles.some((role) => roles?.includes(role)); //esto nos retorna un boolean
      console.log(hasRequiredRole );
      if (!hasRequiredRole ){
        console.log("hola");
        throw new HttpException(
          'No tienes los permisos necesarios para acceder a este recurso.',
          HttpStatus.UNAUTHORIZED,
           
        );
      
      }
      return hasRequiredRole  
    
      // console.log(`Error en el guardian de roles (roles.guard.ts) : ${error.message}`);
      // throw new HttpException(
      //   'No tienes los permisos necesarios para acceder a este recurso.',
      //   HttpStatus.UNAUTHORIZED,
         
      // );
    
    
  }
}

// ¡Por supuesto! Aquí tienes una explicación paso a paso del código que has proporcionado:

// Se importan los módulos y clases necesarios:

// Injectable, CanActivate y ExecutionContext son importados desde @nestjs/common.
// Reflector es importado desde @nestjs/core.
// Se define la clase RolesGuard y se implementa CanActivate:

// La clase RolesGuard es decorada con @Injectable() para que pueda ser inyectada como una dependencia en otros componentes.
// La clase implementa la interfaz CanActivate, que define un método canActivate() que será llamado por NestJS para realizar la lógica de autorización.
// Se define el constructor de RolesGuard con la inyección de dependencias:

// El constructor recibe una instancia de Reflector como argumento, que se utiliza para acceder a los metadatos almacenados en el contexto de la aplicación.
// La instancia de Reflector se asigna a la propiedad reflector de la clase RolesGuard, lo que permite acceder a ella en otros métodos de la clase.
// Se implementa el método canActivate(context: ExecutionContext): boolean:

// Este método es llamado por NestJS cuando se evalúa si un controlador o método de controlador tiene permisos para ser activado.
// En primer lugar, se utiliza this.reflector.getAllAndOverride() para obtener los roles requeridos almacenados como metadatos utilizando la clave ROLES_KEY (definida en otro lugar del código).
// getAllAndOverride() devuelve un arreglo de roles o undefined si no se encuentran metadatos.
// A continuación, se obtiene el objeto user del contexto de la solicitud HTTP utilizando context.switchToHttp().getRequest().
// Se verifica si se encontraron roles requeridos. Si no hay roles requeridos, se permite el acceso y se devuelve true.
// Si hay roles requeridos, se utiliza el método some() en el arreglo de roles requeridos para verificar si al menos uno de los roles está presente en el arreglo de roles del usuario.
// Si se encuentra al menos un rol coincidente, se permite el acceso y se devuelve true. Si no se encuentra ningún rol coincidente, se niega el acceso y se devuelve false.
// En resumen, la clase RolesGuard es un guardia de autorización que utiliza los metadatos almacenados en el contexto de la aplicación para verificar si un usuario tiene los roles requeridos para acceder a un controlador o método de controlador específico. Si el usuario tiene al menos uno de los roles requeridos, se permite el acceso; de lo contrario, se deniega el acceso.