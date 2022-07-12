import { NextFunction, Request, Response } from "express";

export const authenticationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const userId = request.headers["userid"];

  if (typeof userId !== "string") {
    return response.status(401).json({
      message: "You must be authenticated.",
    });
  }

  if (userId !== process.env.PASSWORD) {
    return response.status(401).json({
      message: "You must be authenticated.",
    });
  }
  next();
};
