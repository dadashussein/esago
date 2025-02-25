# Project Setup Guide
[:)](https://www.youtube.com/watch?v=K5KAc5CoCuk)

## 1. Create Virtual Environment

To create a virtual environment for your project:

```bash
python -m venv {env-name}  # Replace {env-name} with your desired environment name
```

Activate the virtual environment:
- On Windows

```bash
{env-name}\Scripts\activate
```

- On Linux and MACos
```bash
source {env-name}/bin/activate
```
## 2. Install Dependencies
Install project dependencies listed in the requirements.txt file:

```bash
pip install -r requirements.txt
```

## 3. Set Up PostgreSQL with Docker

Start PostgreSQL service using Docker Compose:

```bash
docker-compose up
```

## 4. Create .env File
Create a .env file for your project. Here's an example .env file:

```env
GOOGLE_CLIENT_ID={"your-client-id"}
GOOGLE_CLIENT_SECRET={"your-client-secret"}
SECRET_KEY={"secret-key"}
ALGORITHM="HS256"
DB=postgresql
DB_USER=admin
DB_PASSWORD={your-password}
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=esagodb

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME={your-gmail}
EMAIL_PASSWORD={"your-gmail-secret-key"}
EMAIL_FROM={your-gmail}
EMAIL_TLS=True
```
- secret-key: is necessary for creating unique token and you can get it 
```bash 
openssl rand -hex 32 
```
or 
```bash 
openssl rand -hex 64 
```
- EMAIL_USERNAME and EMAIL_FROM = your gmail.
- EMAIL_PASSWORD=[you can find how can you create app password in google in this link](https://support.google.com/mail/answer/185833?hl=en)
---
*Update the values in the .env file according to your configuration.*

## 5. Perform Migrations
Generate and apply database migrations using Alembic:
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## 6. Start the Application
Run the application using Uvicorn:

```bash
uvicorn main:app --reload
```


# Authors

- Ravan Asadov: [Github](https://github.com/ravanasad)
- Javid Jalilov: [Github](https://github.com/pxmpkeen)
- Dadash Huseynzade: [Github](https://github.com/dadashussein)
- Yashar Heydarov: [Github](https://github.com/heydarov93)
