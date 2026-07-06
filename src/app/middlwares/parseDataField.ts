import { Request, Response, NextFunction } from 'express';

export const parseDataField = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.body.data) {
    try {
      const parsedData = JSON.parse(req.body.data);
      // If image is uploaded via multer, attach the path to the parsed data so Zod can validate it
      if (req.file && req.file.path) {
        parsedData.imageUrl = req.file.path;
      }
      req.body = parsedData; // Replace req.body with the parsed JSON so validateRequest works
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format in data field',
      });
    }
  }
  next();
};
