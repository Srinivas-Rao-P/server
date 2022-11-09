
// require('dotenv').config()
// const express = require('express')
// const jwt = require('jsonwebtoken')
// const router = express.Router()
// const db = require("../../database/connect");

// let refreshTokens = []

// router.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({ accessToken: accessToken })
//   })
// })

// router.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

// router.post('/login', (req, res) => {
//   // Authenticate User

//   const username = req.body.username
//   const user = { name: username }

//   const accessToken = generateAccessToken(user)
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//   refreshTokens.push(refreshToken)
//   res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })
// router.post('/register', (req, res) => {
//   const { username, password } = req.body
//   // db.
//   res.json({ username: username, password: password })
// })

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1500000s' })
// }

// module.exports = router;

import Database from '../database/database';
import UserService from '../user/user.service';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';

class AuthService {
  private db: Database;
  private databaseget: Database;
  private userService: UserService;
  constructor() {
    this.db = new Database();
    this.databaseget = new Database(true);
    this.userService = new UserService();
  }

  public async login(req: any): Promise<any> {

    const user = {
      name: req.username,
      id: req.id,
      userRole: req.userRole
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    this.db.query(`
    INSERT 
      INTO 
      tokens(userid, token, refreshToken) 
        VALUES (
          ${this.db.connection.escape(user.id)},
          ${this.db.connection.escape(accessToken)},
          ${this.db.connection.escape(refreshToken)})
          ON DUPLICATE KEY
            UPDATE 
            token = ${this.db.connection.escape(accessToken)};
      `);

    return { accessToken: accessToken, refreshToken: refreshToken }
  }

  public async candidateLogin(req: any): Promise<any> {
    const user = {
      name: req.email,
      email: req.email,
      id: req.candidateId,
      userRole: 5
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    this.db.query(`
    INSERT 
      INTO 
      tokens(userid, token, refreshToken) 
        VALUES (
          ${user.id},
          '${accessToken}',
          '${refreshToken}')
          ON DUPLICATE KEY
            UPDATE 
            token = ${this.db.connection.escape(accessToken)};
      `);

    return { accessToken: accessToken, refreshToken: refreshToken }
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user) => {

      if (!err) {
        const userDetails = {
          name: user.username,
          id: user.id,
          userRole: user.userRole
        }
        const accessToken = generateAccessToken(userDetails)
        this.db.query(`
        INSERT 
          INTO 
          tokens(userid, token) 
            VALUES (
              ${user.id},
              ${this.db.connection.escape(accessToken)})
              ON DUPLICATE KEY
                UPDATE 
                token = ${this.db.connection.escape(accessToken)};
          `);
        return { accessToken: accessToken }
      } else {
        console.log(err);
        return err
      }
    })
  }

  public async register(req: any): Promise<any> {
    const { username, password } = req
    return this.db.query(`
            INSERT INTO users(username, password)             
              Values(
                  ${this.db.connection.escape(username)},
                  ${this.db.connection.escape(password)}
                )
            `);
  }

  public async validateUser(username: string): Promise<any> {
    console.log(`select u.id from users u where username = '${username}'`);

    return this.db.query(`
      select u.id from users u where username = '${username}'
    `);
  }

  public async generateOtp(userid: string): Promise<any> {
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    return this.db.query(`
      INSERT INTO resetpassword(personid, otp) VALUES (${userid}, ${otp})
      ON DUPLICATE KEY UPDATE otp = ${otp};
    `);

  }

  public async verifyOtp(req: any): Promise<any> {
    return this.db.query(`
      select r.id from resetpassword r where r.personid = (select id from users u where u.username = '${req.username}')
      and r.otp = '${req.otp}'
    `);
  }

  public async resetPassword(req: any): Promise<any> {
    return this.db.query(`
      update users set password = '${req.password}' where username = '${req.username}'
    `);
  }

  public async logout(token: string): Promise<any> {
    return this.db.query(`
      DELETE FROM tokens WHERE refreshToken = '${token}'
    `);
  }
};


export default AuthService;

const generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1500000s' })
}