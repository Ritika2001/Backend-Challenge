import { getBestThreeQuotes } from "../src/controllers/user.controller"; // Update with your actual controller file path
import { createQuote } from "../src/controllers/quote.controller"; // Update with your actual controller file path
import { Request, Response } from 'express';
import { myDataSource } from "../src/app-data-source";
import { DataSource } from "typeorm";

// let dataSource: DataSource;
// jest.mock('../src/app-data-source', () => ({
//     myDataSource: {
//       getRepository: jest.fn(() => ({
//         findOne: jest.fn(),
//         save: jest.fn(),
//       })),
//     },
//   }));

jest.mock('../src/app-data-source', () => ({
    myDataSource: {
      getRepository: jest.fn(() => ({
        findOne: jest.fn(async (entity: string) => {
          switch (entity) {
            case 'users':
              return { id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'Man', dob: '1990-01-01', driveStartDate: '2022-01-01', };
            case 'cars':
              return { carId: 1, carModel: 'Toyota Camry', carType: 'Sedan', vin: '12345678901234567', userId: 1 };
            case 'quotes':
              return [
                { id: 1, policyId: "1234567890", company: "ABC Insurance", premium: 100, coverage: "Basic" },
                { id: 2, policyId: "2345678901", company: "XYZ Insurance", premium: 600, coverage: "Standard" },
                { id: 3, policyId: "3456789012", company: "123 Insurance", premium: 700, coverage: "Premium" },
                { id: 4, policyId: "4567890123", company: "ABC Insurance", premium: 550, coverage: "Basic" },
                { id: 5, policyId: "5678901234", company: "XYZ Insurance", premium: 650, coverage: "Standard" },
              ];
            case 'cars_quotes_quotes':
              return [
                { carsCarId: 1, quotesId: 1 },
                { carsCarId: 1, quotesId: 2 }];
            default:
              return null;
          }
        }),
        save: jest.fn(),
      })),
    },
  }));
  
jest.mock('../src/entities/user.entity', () => ({
  Users: jest.fn(),
}));
jest.mock('../src/entities/car.entity', () => ({
  Cars: jest.fn(),
}));
jest.mock('../src/entities/quotes.entity', () => ({
  Quotes: jest.fn(),
}));



describe('getBestThreeQuotes', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;


  beforeEach(() => {
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 and length body should be not 0', async () => {

    req = {
        query: {
            email: 'test@example.com',
            vin: '12345678901234567'
        }
    }
    await getBestThreeQuotes(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    });

  it('should return status 500 and message "No parameters in request"', async () => {
    req = { body: {} };

    await getBestThreeQuotes(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'No parameters in request' });
    });
});

