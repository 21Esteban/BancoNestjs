import { compareSync, hashSync } from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

export enum userRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

//Usamos un el decorador @Entity para hacer que la clase User obtenga algunos metodos y propiedades . es un decorador de clase que modifica y añade cosas a la clase

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({select:false}) //asi no aparecen las passwords en las peticiones
  password: string;

  @Column({
    type:"set",
    enum:userRole,
    default:[userRole.CLIENT ]
  })
  role: userRole[];
  //     @Column({ default: 'client', length: 15 })
  //   role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //antes de meter a la base de datos, encriptamos la password
  @BeforeInsert()
  encriptarPassword(){
    const saltRounds = 10
    this.password = hashSync(this.password,saltRounds)
  }

  //metodo para comparar contraseñas , por que hacemos un metodo aca para eso ? // por que es mejor tenerlo encapsulado y que simplemente sea solo llamar el metodo en ves de repetir codigo en cada servicio o funcion de servicio que lo vayamos a usar , aunque solamente lo vamos a usar en el de login :v    

  //esto tambien lo hubieramos podido hacer en el userService como un metodo y ya luego llamarlo

  matchPassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
