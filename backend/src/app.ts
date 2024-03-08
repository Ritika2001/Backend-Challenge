import express from 'express';
import { myDataSource } from "./app-data-source"
import { createQuote } from './controllers/quote.controller';
import { getBestThreeQuotes } from './controllers/user.controller';
import "reflect-metadata"
import path from 'path';
import cacheHeaders from 'express-cache-headers'; 


const app = express();
const port = 3000;
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 50, 
});

app.use(limiter);
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

    app.post('/api/quotes', cacheHeaders(60), createQuote);
    app.get('/api/quotes/best-three', cacheHeaders(60), getBestThreeQuotes);

    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });
