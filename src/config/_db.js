const mongoose = require('mongoose');

const connectDB = () => {
  console.log(process.env.PASSWORD);
  const DB_URI = process.env.MONGO_URI.replace('<password>', process.env.PASSWORD);
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`db connection succcessful`))
    .catch((error) => console.log(`db connnection failure. Error: ${error.message}`));
};

module.exports = connectDB;
