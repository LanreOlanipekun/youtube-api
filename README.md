# README

This README documents whatever steps are necessary to get your application up and running.

### What is this repository for?

- Quick summary: APIs for getting youtube video details and comments
- Version: 1.0.0

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LanreOlanipekun/youtube-api
   cd youtube-api

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Add environment variable

Add the necessary environment variable in the .env file. Check .env.example

## Available scripts

1. Development

### Starts the development server with Vite. The app will be accessible at http://localhost:<PORT>

#### You can specify your port in the env file. check the .env.example

```bash
npm run dev

```

2. Build

### Builds the app for production. It first compiles TypeScript (tsc -b) and then bundles the project using Vite.

```bash
npm run build

```

3. build routes

### Generate all the swagger routes as specified in the controller

```bash
npm run build-routes

```

4. start

### Starts the app in production

```bash
npm start

```

5. test

### Run available tests in the test folder

```bash
npm run test

```

## Project struture

## File Structure

- src
  - api
  - config
  - interfaces
  - middleware
  - migrations
  - modules
  - seeders
  - types
  - utils
- templates
- tests

## Technology used

- Node Js
- TypeScript: A typed superset of JavaScript
