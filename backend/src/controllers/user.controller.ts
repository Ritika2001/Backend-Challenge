import { Request, Response } from 'express';
import { myDataSource } from "../app-data-source"
import { Users } from '../entities/user.entity';
import { Cars } from '../entities/car.entity';
import { Quotes } from '../entities/quotes.entity';

const userRepository = myDataSource.getRepository(Users);
const carRepository = myDataSource.getRepository(Cars);
const quotesRepository = myDataSource.getRepository(Quotes);

export const getBestThreeQuotes = async (req: Request, res: Response) => {
  try{
    const email = req.query.email as string;
    const vin = req.query.vin as string;
    console.log(req.query);

    try{
        console.log("Here");
        const currentUser = await userRepository.findOne({ where: { email } });
        console.log(currentUser);
        // const currentUser = await userRepository.createQueryBuilder("user")
        // .leftJoinAndSelect("user.cars", "car")
        // .where("user.email = :email", { email: email })
        // .andWhere("car.vin = :vin", { vin: vin })
        // .getOne();
        // console.log(currentUser);
    
          if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
        //   const userCar = currentUser.cars[0];
        //   if (!userCar) {
        //     return res.status(404).json({ message: 'User does not own a car' });
        //   }
    
        //   const carQuotes = await quotesRepository.createQueryBuilder('quotes')
        //   .select(['quotes.id', 'quotes.policyId', 'quotes.company', 'quotes.premium', 'quotes.coverage'])
        //   .innerJoin('quotes.cars', 'cars')
        //   .where('cars.carId = :carId', { carId: userCar.carId })
        //     .orderBy('quotes.premium', 'ASC')
        //     .limit(3)
        //     .getMany();
    
        //   return res.status(200).json(carQuotes);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  }
  catch (error) {
    return res.status(500).json({ message: 'No parameters in request' });
  }
};
