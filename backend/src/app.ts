import express from 'express';
import { myDataSource } from "./app-data-source"
import { createQuote } from './controllers/quote.controller';
import { getBestThreeQuotes } from './controllers/user.controller';
import "reflect-metadata"
import path from 'path';


const app = express();
const port = 3000;
const cors = require('cors');

const router = express.Router();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));


// Initialize the data source before starting the server
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // Start the server only after the data source is initialized
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.post('/api/quotes', createQuote);
    app.get('/api/quotes/best-three', getBestThreeQuotes);

    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });
