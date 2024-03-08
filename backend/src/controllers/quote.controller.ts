import { Request, Response } from 'express';
import { myDataSource } from "../app-data-source"
import { Users } from '../entities/user.entity';
import { Cars } from '../entities/car.entity';
import { Quotes } from '../entities/quotes.entity';

const userRepository = myDataSource.getRepository(Users);
const carRepository = myDataSource.getRepository(Cars);
const quotesRepository = myDataSource.getRepository(Quotes);

export const createQuote = async (req: Request, res: Response) => {
  const { email, firstName, lastName, dob, driveStartDate, carModel, carType, vin} = req.body;
  const existingUser = await userRepository.findOne({ where: { email } });
    if (!existingUser) {
      const newUser = new Users();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.dob = dob;
      newUser.driveStartDate = driveStartDate;

      try {
        await userRepository.save(newUser);
      } catch (error) {
        return res.status(500).json({ message: 'Enter all user details' });
      }
    }
    else {
      console.log("User already exists")
    }

    const currentUser = await userRepository.findOne({ where: { email } });

    const existingCar = await carRepository.findOne({ where: { vin } });

    if (existingCar) {
        console.log("Car already exists")
    }
    else {
      const newCar = new Cars()
      newCar.carModel = carModel
      newCar.carType = carType
      newCar.vin = vin
      newCar.user = currentUser

      try {
        await carRepository.save(newCar);
      } catch (error) {
        console.error('Error saving car:', error);
      }

    }
    const currentCar = await carRepository.findOne({ where: { vin } });
    
    try {
      const quotesResponse = await fetch(`http://localhost:3001/${carType}`);
      const quotes = await quotesResponse.json();
    
      for (const quote of quotes) {
        // Check if the quote with the same policy ID already exists
        const existingQuote = await quotesRepository.findOne({ where: { policyId: quote.policyId }, relations: ['cars'] });

        
        if (!existingQuote) {
          const newQuote = new Quotes();
          newQuote.policyId = quote.policyId;
          newQuote.company = quote.company;
          newQuote.premium = quote.premium;
          newQuote.coverage = quote.coverage;
          newQuote.cars = [currentCar];
          
          try {
            await quotesRepository.save(newQuote);
          } catch (error) {
            console.error('Error saving Quote:', error);
          }
        } else {
          existingQuote.cars.push(currentCar);
          try {
            await quotesRepository.save(existingQuote);
          } catch (error) {
            console.error('Error saving Quote:', error);
          }
        }
      }
    
      return res.status(200).json({ message: 'Quotes saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
};


