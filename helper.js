const { SECRET_PASSWORD_KEY } = require("./config");
const jwt = require('jsonwebtoken');

exports.decodedJwtToken = (authorization) => {
  return jwt.verify(authorization, SECRET_PASSWORD_KEY);
}

exports.generateAccesToken = (id) => {
  const paylod = {
    id
  }
  return jwt.sign(paylod, SECRET_PASSWORD_KEY, { expiresIn: "24h" })
}

