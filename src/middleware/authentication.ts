import { NextFunction, Request, Response } from "express";

export const authenticationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.get("Wordnett-Token");
  if (token !== process.env.PASSWORD) {
    return response.status(401).json({
      message: "You must be authenticated.",
    });
  }
  next();
};
