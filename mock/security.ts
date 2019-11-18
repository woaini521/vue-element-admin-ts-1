import { Response, Request, NextFunction } from 'express'

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('x-token')
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      messaege: 'Invalid Access Token'
    })
  }
  next()
}
