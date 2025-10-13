module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      const errorObj = new Error(
        error.details.map((e) => e.message).join(", ")
      );
      errorObj.statusCode = 400;
      throw errorObj;
    }
    next();
  };
};
