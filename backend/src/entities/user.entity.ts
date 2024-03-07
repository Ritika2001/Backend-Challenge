import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Cars } from "./car.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { nullable: false })
    email: string;
    
    @Column('text', { nullable: false })
    firstName: string

    @Column('text', { nullable: false })
    lastName: string

    @Column('date', { nullable: false })
    dob: Date

    @Column('date', { nullable: false })
    driveStartDate:  Date

    @OneToMany(() => Cars, (car) => car.user) 
    cars: Cars[]
}