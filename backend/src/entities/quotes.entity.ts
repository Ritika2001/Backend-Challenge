import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cars } from './car.entity';

@Entity()
export class Quotes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    policyId: string

    @Column('text')
    company: string;

    @Column('int')
    premium: number;

    @Column('text')
    coverage: string;

    @ManyToMany(() => Cars, (car) => car.quotes)
    cars: Cars[] 
}
