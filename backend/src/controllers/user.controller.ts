// // import { Request, Response } from 'express';
// import { User } from '../entities/user.entity';

// import express, { Request, Response } from 'express';
// import { getRepository } from 'typeorm';
// // import { User } from '../entities/User';

// const router = express.Router();

// export class UserController {
//   static async fetchQuotes(req: Request, res: Response) {
//     try {
//         router.post('/register_user', async (req: Request, res: Response) => {
//             const userRepository = getRepository(User);
//             const { email, password } = req.body;
          
//             const existingUser = await userRepository.findOne({ where: { email } });
//             if (existingUser) {
//               return res.status(400).json({ message: 'User already exists' });
//             }
          
//             const newUser = userRepository.create({ email, password });
//             await userRepository.save(newUser);
          
//             res.json({ message: 'User registered successfully' });
//           });// Logic to fetch quotes based on user input
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
