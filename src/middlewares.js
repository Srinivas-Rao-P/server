
const jwt = require('jsonwebtoken')
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
  function errorHandler(err, res) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message
    });
  }
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  module.exports = {
    notFound,
    errorHandler,
    authenticateToken
  };