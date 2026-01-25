import type { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

export const sendSuccess = <T>(
  res: Response<ApiResponse<T>>,
  data: T,
  status = 200
) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const sendError = (
  res: Response<ApiResponse<never>>,
  message: string,
  status = 500
) => {
  return res.status(status).json({
    success: false,
    error: {
      message,
    },
  });
};
