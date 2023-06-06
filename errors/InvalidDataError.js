module.exports = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDataError';
    this.statusCode = 404;
  }
};