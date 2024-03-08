import { getBestThreeQuotes } from "../src/controllers/user.controller"; // Update with your actual controller file path
import { createQuote } from "../src/controllers/quote.controller"; // Update with your actual controller file path
import { Request, Response } from 'express';
import { myDataSource } from "../src/app-data-source";
import { DataSource } from "typeorm";
import { Users } from '../src/entities/user.entity';
import { Cars } from '../src/entities/car.entity';
import { Quotes } from '../src/entities/quotes.entity';

const userRepository = myDataSource.getRepository(Users);
const carRepository = myDataSource.getRepository(Cars);
const quotesRepository = myDataSource.getRepository(Quotes);
  
let req: Partial<Request>;
let res: Partial<Response>;

beforeAll(async() => {
    await myDataSource.initialize();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };
    req = { body: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'Man',
      dob: '1990-01-01',
      driveStartDate: '2022-01-01',
      carModel: 'Toyota Camry',
      carType: 'Sedan',
      vin: '12334567'
  } };
  await createQuote(req as Request, res as Response);

  });

  afterAll(async () => {
    await myDataSource.destroy(); 
  });

describe('getBestThreeQuotes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200', async () => {

    req = {
        query: {
            email: 'test@example.com',
            vin: '12334567'
        }
    }
    await getBestThreeQuotes(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    });


    it('should return status 404 and message "User not found"', async () => {

        req = {
            query: {
                email: 'example@gmail.com',
                vin: '123456'
            }
        }
        await getBestThreeQuotes(req as Request, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found or User does not own a car' });

        });

    
  it('should return status 500 and message "No parameters in request"', async () => {
    req = { body: {} };

    await getBestThreeQuotes(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'No parameters in request' });
    });
});

