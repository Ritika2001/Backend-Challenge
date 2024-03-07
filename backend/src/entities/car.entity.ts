import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './user.entity';
import { Quotes } from './quotes.entity';

@Entity()
export class Cars {
    @PrimaryGeneratedColumn()
    carId: number;

    @Column('text')
    carModel: string;

    @Column('text')
    carType: string;

    @ManyToOne(() => Users, (user) => user.cars)
    @JoinColumn({ name: 'userId' })
    user: Users

    @Column('int')
    vin: number

    @ManyToMany(() => Quotes, (quote) => quote.cars)
    @JoinTable()
    quotes: Quotes[]
}
