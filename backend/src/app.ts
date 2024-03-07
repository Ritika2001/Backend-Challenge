import express from 'express';
import { myDataSource } from "./app-data-source"
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from './entities/user.entity';
import { Cars } from './entities/car.entity';
import { Quotes } from './entities/quotes.entity';
import "reflect-metadata"



const app = express();
const port = 3000;
const cors = require('cors');

const router = express.Router();
app.use(cors());
app.use(express.json());
app.use('/', router);

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

router.post('/api/quotes', async (req: Request, res: Response) => {
  const userRepository = myDataSource.getRepository(Users)
  const carRepository = myDataSource.getRepository(Cars)
  const quotesRepository = myDataSource.getRepository(Quotes);

  console.log(req.body)

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
          console.error('Error saving user:', error);
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
          // If the quote already exists, just save the relationship with the current car
          console.log(existingQuote);
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
      console.error('Error fetching or saving quotes:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/api/quotes/best-three', async (req: Request, res: Response) => {
  const userRepository = myDataSource.getRepository(Users);
  const carRepository = myDataSource.getRepository(Cars);
  const quotesRepository = myDataSource.getRepository(Quotes);

  const email = req.query.email as string;
  const vin = req.query.vin as string;

  console.log(req.query);

  try{
    const currentUser = await userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.cars", "car")
    .where("user.email = :email", { email: email })
    .andWhere("car.vin = :vin", { vin: vin })
    .getOne();

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userCar = currentUser.cars[0];
      if (!userCar) {
        return res.status(404).json({ message: 'User does not own a car' });
      }

      const carQuotes = await quotesRepository.createQueryBuilder('quotes')
        .innerJoinAndSelect('quotes.cars', 'cars')
        .where('cars.carId = :carId', { carId: userCar.carId })
        .orderBy('quotes.premium', 'ASC')
        .limit(3)
        .getMany();
      return res.status(200).json(carQuotes);
  } catch (error) {
    console.error('Error fetching best three quotes:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
