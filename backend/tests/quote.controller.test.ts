import { createQuote } from "../src/controllers/quote.controller"; // Update with your actual controller file path
import { Request, Response } from 'express';

// Mock the necessary dependencies
jest.mock('../src/app-data-source', () => ({
  myDataSource: {
    getRepository: jest.fn(() => ({
      findOne: jest.fn(),
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

describe('createQuote', () => {
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

  it('should return status 200 and message "Quotes saved successfully"', async () => {
    req = { body: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'Man',
        dob: '1990-01-01',
        driveStartDate: '2022-01-01',
        carModel: 'Toyota Camry',
        carType: 'Sedan',
        vin: '12345678901234567'
    } };
    await createQuote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Quotes saved successfully' });
  });

  it('should return status 500 and message "Internal server error"', async () => {
    req = { body: {} };

    await createQuote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});

