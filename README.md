# E-Commerce Website

## .env
- Create .env file inside server and copy bolow.

```.env
PORT=
MONGO_LOCAL_URL=
JWT_SECRET_KEY=
JWT_EXPIRE=3d
COOKIE_EXPIRES=3
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Packages
### Backend packages
```bash
npm i express mongoose dotenv validator bcryptjs jsonwebtoken cookie-parser nodemailer express-fileupload cloudinary
```

### Frontend packages

```bash
npm i react-router-dom tailwindcss @tailwindcss/vite react-icons @reduxjs/toolkit react-redux axios react-toastify country-state-city
```

## Nodejs Modern version
- Modern nodejs has built-in support for automatic restart and loading enviroment variables.
    - _nodemon & dotevn are not required_

```bash
# automatic restarts
node --watch index.js # nodemon not required
```

```js
// load enviroment variables
process.loadEnvFile(); // top of entry file
```

