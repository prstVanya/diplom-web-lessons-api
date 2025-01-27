const {
  PORT = 3000,
  dataMongoose = 'mongodb://127.0.0.1:27017/diplom',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  dataMongoose,
  NODE_ENV,
  JWT_SECRET,
}