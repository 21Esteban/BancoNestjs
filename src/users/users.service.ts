import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FastifyReply } from 'fastify';
import { response } from 'src/helpers/Response';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

//Vamos a usar Fastify para las Request y los Response

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //Respuesta sin manejar el request y el reply de fastify
  async create(createUserDto: CreateUserDto) {
    try {
      const email = createUserDto.email;
      const user = await this.usersRepository.findOne({ where: { email } });
      // console.log(user)
      if (user) {
        return 'El email ya se encuentra registrado';
      }
      const newUser = this.usersRepository.create(createUserDto);

      await this.usersRepository.save(newUser);

      return `This action adds a new user ${JSON.stringify(newUser)}`;
    } catch (error) {
      return `Error en el serviciop de create ${error}`;
    }
  }

  async create1(createUserDto: CreateUserDto, reply: FastifyReply) {
    try {
      const email = createUserDto.email;
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log(user)
      if (user) {
        return response(
          reply,
          400,
          false,
          null,
          'El email ya se encuentra registrado',
        );
      }

      //vamos a encriptar la password
      // const saltRounds = 10 // Número de rondas de encriptación
      // const passwordEncriptada = await bcrypt.hash(createUserDto.password,saltRounds)

      // const newUser = this.usersRepository.create({...createUserDto,password:passwordEncriptada});
      // Esta manera de encriptar la password es valida , pero podemos udar un decorador en la entidad , que antes de guardar el user , haga lo de arriba .
      //*____________________________________________________________________________________________-

      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser)  
      // delete newUser.password
      return response(
        reply,
        201,
        true,
        newUser,
        'Usuario creado correctamente',
      );
    } catch (error) {
      return this.catch(reply, error, 'userService create1');
    }
  }

  //todo Esta fn de autenticacion o login lo pasamos a authService
  // async login(reply:FastifyReply,loginUserDto:LoginUserDto){
  //   try {
  //     const { email, password } = loginUserDto;
  //     const user = await this.usersRepository.findOne({ where:{email} });
  //   if (user && user.matchPassword(password)) {
  //     // const token = generateToken({ user: user._id });
  //     return response(
  //       reply,
  //       200,
  //       true,
  //       { ...user, password: null},
  //       "Bienvenido"
  //     );
  //   }
  //   response(reply, 400, false, "", "email or password is incorrect");
  //   } catch (error) {
  //     return this.catch(reply, error, 'userService login');
  //   }
  // }




  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return `This action returns all users ${JSON.stringify(users)}`;
    } catch (error) {
      return 'Error en el serviciop de findAll';
    }
  }

  async findAll1(reply:FastifyReply) {
    try {
      const users = await this.usersRepository.find();
      response(reply,200,true,users,"Lista de usuarios")
    } catch (error) {
      return this.catch(reply, error, 'userService findAll1');
    }
  }


  async findOne(id: number,reply:FastifyReply) {
   try {
     const user = await this.usersRepository.findOne({where:{id}})
     if(!user){
      return response(reply,404,false,null,"Usuario no encontrado")
     }
     return response(reply,200,true,user,"Usuario encontrado")
   } catch (error) {
    return this.catch(reply, error, 'userService findOne');
   }
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  catch(reply: FastifyReply, error: any, nameFunction: string) {
    response(
      reply,
      500,
      false,
      null,
      `Ha ocurrido un error en ${nameFunction} , error : ${error}`,
    );
  }
}
