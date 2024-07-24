# Schedulr

A full-stack personal reminder and calendar app built with React 
and React Native for cross-platform compatibility. Developed using 
Test-DrivenDevelopment (TDD) with Jest. The backend is implemented 
with Node.js, Express, and PostgreSQL, utilizing Sequelize ORM.

# Features

- Create, update, and delete reminders
- Schedule notifications for reminders
- User authentication and profile management
- Cross-platform compatibility
- Test-Driven Development (TDD)

# Prerequisites
- Node.js
- PostgreSQL
- npm
- React Native CLI

# Set up

1. Clone repository: 
- `git clone https://github.com/Lilymayh/Schedulr.git`
- `cd Schedulr`

2. Install Backend dependecies: 
- `cd schedulr-backend`
- `npm install`

3. Add the following content to a `.env`:

'DB_NAME=schedulr_dev
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_DIALECT=postgres'

4. Run database migrations:
- `npx sequelize-cli db:migrate`

5. Install frontend dependencies:
- `cd ../schedulr-web`
- `npm install`

6. Install mobile dependencies:
- `cd ../SchedulrMobile`
- `npm install`

# Running

- Start schedulr-backend with `npm start`, then run either:

1. Schedulr web: `cd schedulr-web`
- `npm start`

2. Schedulr mobile: `cd SchedulrMobile`
- `npx react-native run-ios`
or
- `npx react-native run-android`

# Testing

1. `cd schedulr-backend`
2. `npm test`