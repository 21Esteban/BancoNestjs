import { Controller, Get, Post, Body, Patch, Param, Delete,Request,Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { userRole } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
//**_______________________________________________________________________________________ */
  @Post('sinFastify')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post()
  create1(@Body() createUserDto:CreateUserDto,@Response() reply:FastifyReply){
    return this.usersService.create1(createUserDto,reply)
  }

//**_______________________________________________________________________________________ */
//todo Este controlador lo pasamos a authController

  // @Post('login')
  // login(@Body() loginUserDto:LoginUserDto , @Response() reply:FastifyReply){
  //   return this.usersService.login(reply,loginUserDto)
  // }

//**_______________________________________________________________________________________ */

  //por ahora voy a usar el decorador de roles aqui ,para probar , luego en el de abajo
//   Exactamente. En el código que proporcionaste, la función Roles utiliza la función SetMetadata para almacenar los roles proporcionados como argumentos en el decorador. Estos roles se guardan como metadatos en el contexto de la aplicación.

// Una vez que has utilizado el decorador @Roles en un controlador o método de controlador específico, los roles asignados se almacenan en los metadatos de ese controlador o método. Esto permite que otros componentes o decoradores en la aplicación accedan a esos metadatos y realicen acciones basadas en los roles asignados.

// En resumen, el decorador @Roles proporciona una forma de asignar roles a los controladores o métodos de controladores en NestJS y almacenar esa información como metadatos en la aplicación, lo que permite la implementación de lógica personalizada basada en roles en la aplicación.
  
  @Get('sinFastify')
  findAll() {
    return this.usersService.findAll();
  }
  
  @UseGuards(RolesGuard)
  @Roles(userRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll1(@Response() reply:FastifyReply) {
    return this.usersService.findAll1(reply);
  }

//**_______________________________________________________________________________________ */


  @Get(':id')
  findOne(@Param('id') id: string,@Response() reply:FastifyReply) {
    return this.usersService.findOne(+id,reply);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
