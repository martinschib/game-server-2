const authenticationMiddleware = async (request, response, next) => {
  const userId = request.headers["userid"];

  if (!userId === process.env.PASSWORD) {
    return response.status(401).json({
      message: "You must be authenticated.",
    });
  }
  next();
};

module.exports = authenticationMiddleware;
