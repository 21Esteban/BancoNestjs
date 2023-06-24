import { SetMetadata } from '@nestjs/common';
import { userRole } from 'src/users/entities/user.entity';

export const ROLES_KEY = "roles";


//
export const Roles = (...roles:userRole[])=>{
    return SetMetadata(ROLES_KEY, roles);   
}

// Este código muestra un ejemplo de un decorador en NestJS que se utiliza para asignar roles a los controladores o métodos de controladores en una aplicación. Vamos a desglosar el código paso a paso:

// import { SetMetadata } from '@nestjs/common';:

// Importa la función SetMetadata del paquete @nestjs/common. Esta función se utiliza para agregar metadatos a los controladores o métodos de controladores.
// import { userRole } from 'src/users/entities/user.entity';:

// Importa el tipo userRole desde la entidad user del directorio src/users/entities/user.entity. Este tipo probablemente define los roles posibles para los usuarios en la aplicación.
// export const ROLES_KEY = "roles";:

// Exporta una constante llamada ROLES_KEY que tiene el valor de "roles". Esta constante se utiliza como clave para identificar los metadatos relacionados con los roles en NestJS.
// export const Roles = (...roles:userRole[]) => { ... }:

// Exporta una función llamada Roles que acepta una lista de roles como argumentos. La sintaxis ...roles:userRole[] indica que la función acepta un número variable de argumentos de tipo userRole. Esta función se utilizará como un decorador en los controladores o métodos de controladores.
// return SetMetadata(ROLES_KEY, roles);:

// Utiliza la función SetMetadata para agregar metadatos a los controladores o métodos de controladores. La función SetMetadata recibe dos argumentos: la clave de los metadatos (ROLES_KEY) y los roles proporcionados como argumentos en el decorador (roles). Esto asignará los roles especificados a los controladores o métodos de controladores decorados con @Roles.
// En resumen, este código define un decorador @Roles que se puede usar en los controladores o métodos de controladores de una aplicación NestJS para asignar roles a esos elementos. Los roles se especifican como argumentos en el decorador y se almacenan como metadatos en la aplicación. Esto permite la implementación de lógica personalizada basada en roles en la aplicación.


//? Finalmente, creamos una clase que comparará los roles asignados al usuario actual con los roles reales requeridos por la ruta actual que se está procesando. Para acceder a los roles de la ruta (metadatos personalizados), usaremos la clase auxiliar, que el marco proporciona de forma inmediata y se expone desde el paquete.RolesGuardReflector@nestjs/core