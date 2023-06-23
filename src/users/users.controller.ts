import { Controller, Get, Post, Body, Patch, Param, Delete,Request,Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/login-user.dto';

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

  @Get('sinFastify')
  findAll() {
    return this.usersService.findAll();
  }

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
