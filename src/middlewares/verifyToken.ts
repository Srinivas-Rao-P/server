
const jwt = require('jsonwebtoken');
import express from 'express';

const verifyToken = () => {

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) return res.sendStatus(401);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(401)
        req.user = user
        next()
      })
    }
    catch (err) {
      res.status(429).send(err);
    };
  }
};

export default verifyToken;