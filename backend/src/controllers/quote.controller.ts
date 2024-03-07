// import { Request, Response } from 'express';
// import { User } from '../entities/user.entity';

// export class QuoteController {
//   static async fetchQuotes(req: Request, res: Response) {
//     try {
//       // Logic to fetch quotes based on user input
//       // Assuming user input is passed in the request body
//       const { name, age, carModel, yearsOfDrivingExperience } = req.body;
      
//       // Mocked quotes for demonstration
//       const quotes = [
//         { id: 1, insurance_provider: 'Provider A', price: 1000 },
//         { id: 2, insurance_provider: 'Provider B', price: 1200 },
//         { id: 3, insurance_provider: 'Provider C', price: 950 },
//         { id: 4, insurance_provider: 'Provider D', price: 1100 }
//       ];

//       res.json({ quotes });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   static async getBestThreeQuotes(req: Request, res: Response) {
//     try {
//       // Logic to fetch and return the best three quotes
//       const quotes = [
//         { id: 1, insurance_provider: 'Provider A', price: 1000 },
//         { id: 2, insurance_provider: 'Provider B', price: 1200 },
//         { id: 3, insurance_provider: 'Provider C', price: 950 },
//         { id: 4, insurance_provider: 'Provider D', price: 1100 }
//       ];

//       const bestThreeQuotes = quotes.slice(0, 3);
//       res.json({ bestThreeQuotes });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// }
