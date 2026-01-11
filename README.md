# Running Shoe Quiz

## What is this

A quiz app that helps runners find the right shoe for them.

## What it does

The app asks you questions about your running style and preferences. Based on your answers, it recommends the best shoes for you.

## How to run

### Option 1: Run locally

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Open your browser and go to the URL shown in the terminal.

### Option 2: Run with Docker

Build the Docker image:

```
docker build -t running-shoe-quiz .
```

Run the container:

```
docker run -p 8080:80 running-shoe-quiz
```

Open your browser and go to `http://localhost:8080`
