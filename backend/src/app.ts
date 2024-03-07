import express from 'express';
import { myDataSource } from "./app-data-source"
import { createQuote } from './controllers/quote.controller';
import { getBestThreeQuotes } from './controllers/user.controller';
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

router.post('/api/quotes', createQuote);
router.get('/api/quotes/best-three', getBestThreeQuotes);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
