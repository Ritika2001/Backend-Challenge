import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Cars } from "./car.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    email: string;
    
    @Column('text')
    firstName: string

    @Column('text')
    lastName: string

    @Column('date')
    dob: Date

    @Column('date')
    driveStartDate:  Date

    @OneToMany(() => Cars, (car) => car.user) 
    cars: Cars[]
}