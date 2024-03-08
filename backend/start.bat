REM Create a Docker network
docker network inspect my_network >nul 2>nul
if errorlevel 1 (
  docker network create my_network
)

REM Start a PostgreSQL container
docker ps -a --format "{{.Names}}" | findstr /b "postgres" >nul
if errorlevel 1 (
  docker run --name postgres --network my_network -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

  REM Wait for PostgreSQL to start
  timeout /t 5
  REM Create a database
  docker exec -it postgres psql -U postgres -c "CREATE DATABASE utsafeinsurancedb;"
) else (
    docker start postgres
)

REM Build the Node.js application image

REM Run the Node.js application container
docker ps -a --format "{{.Names}}" | findstr /b "insurance-backend" >nul
if errorlevel 1 (
    docker build -t insurance-backend .
    docker run --network my_network -p 3000:3000 -p 3001:3001 --name insurance-backend insurance-backend
) else (
    docker stop insurance-backend
    docker rm insurance-backend
    docker build -t insurance-backend .
    docker run --network my_network -p 3000:3000 -p 3001:3001 --name insurance-backend insurance-backend
)
