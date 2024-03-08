# Insurance Policy Quote Integration

## Introduction
Hi, this is Ritika Nandi. I have used a functional programming paradigm to solve the MGT Insurance backend code challenge. The code is containerized using Docker so you don't need Node.js and PostgreSQL installed on local machine to run. I have also used unit testing through jest. Exception and error handling has also been incorporated into the code to handle edge cases.

## Dependencies
- Docker (v25.0.3)

## How to run

If you are building for the first time, use -
```bash
docker-compose up --build
```
This will create the PostgreSQL and Node.js containers. For subsequent runs use
```bash
docker-compose up -d
```
Once the containers are running, navigate to `localhost:3000` on the browser to interact with the application.

To check the changes in the DB, open the postgres terminal from docker and run the command to open the interactive psql shell.
```bash
psql -U postgres postgres
```
In the psql shell use this to select the database -
```psql
\c utsafeinsurancedb
```
And finally, you can run any queries like this to check the data stores in the database. 
```sql
SELECT * FROM users;
```


To run the testing suite, run 
```bash
docker ps
```
Get the image name of the backend server (should be something like backend-insurance-backend-1) and run - 
```bash
docker exec -it <name-of-backend-server> npm test
```


To stop the application use -
```bash
docker-compose stop
```


## Folder Structure

The `src` folder contains the source code, `tests` folder contains the testing suite, and the `public` folder contains the HTML file to check the end-points.

Inside the `src` folder, the `controllers` folder contains the logic for processing incoming requests and responses and corresponds to the 2 API endpoints. The `entities` folder defines the database entity objects. I used separate files for independent logic blocks so that changes can be made to individual blocks without disturbing the main `app.ts`.

## Implementation

### Setup:
The Node.js project has been initialized using TypeScript and a PostgreSQL database using TypeORM. 

### API Endpoints:
`/api/quotes`: POST end-point that takes user and car details and fetches insurance quotes from the mock server setup using json-server, and saves the User, Car, fetched Quotes and the relation between 

`/api/quotes/best-three`: GET request retrieves the best three quotes (lowest price) from the previously fetched quotes based on the email and vin of the car (The 2 unique fields of User and Car). If the same combination is requested more than once, no updates are made to the database only the best 3 quotes are fetched.


### Integration:
json-server has been used to mock an insurance dispatcher API. The server fetches quotes based on car type (I've only added 3 types - Sedan, Hatchback and SUV, but more can be added by modifying the `db.json` file.)

### Database:
The database connection details are stored in `.env` file in the root directory and the connection details can be changed to connect with an external database without modifying the code. The DB contains 3 primary entities - User, Cars, and Quotes.

#### Database Design:

The `User` tables contains email, name, date of birth, and date they started driving. The email column has a unique constraint. If a user has entered the email, the user details will be fetched from the table and used accordingly.

The `Car` table stores car model, car type, vin (unique column) and the userId or of the user who has entered the car. It has a many-to-one relation i.e. one user can have multiple cars.

The `Quotes` table contains policy id, insurance company, premium, and coverage. 

The `Car` and `Quotes` table has a many-to-many relation i.e. each mock api call fetches 5 insurance policy options based on car type (out of which, best 3 with lowest prices are retrieved) and same policy can be fetched for multiple cars. Hence, this relation has a junction table to store carId and policyId.

### Error Handling:
Error handling has been added at all stages. Some checks that have been added to ensure data integrity are -
- All fields are mandatory
- Email has to contain '@' to be accepted.
- Date of birth and date started driving has to of type date and be atleast > 16 years, and difference between the 2 dates also has to be 16 years.

If any of the data entered is not consistent, contains missing values, or the API hit fails the error is caught using try-catch blocks. Try-catch blocks are also used to handle duplicate entries into the database.

### Caching
Node package `express-cache-headers` has been used for caching to speed up repeated requests. This can be tested by calling the same end point twice and checking the time taken to fetch the details from network details in browser.

### Testing
Testing has been done using `jest`. I've added the screenshot of the test coverage report in the `docs` folder.

### Rate limiting
I've implemented rate limiting using `express-rate-limit`. It is currently set to 50 times in 5mins, can be changed in lines 15-16 in the app.ts file. It needs to be set to atleast 5 for 1 successful end-to-end run. 

### Containerization
The whole setup has been containerized with Docker. Once `docker-compose up --build` is run, the Node app will wait for the Postgres container to start. If the DB has not been initialized, it will use `init.sql` to initialize the DB. After that it will start the mock API server and finally the Node app.

## Contact Info

For any clarifications feel free to email at ritika.nandi1998@gmail.com.




