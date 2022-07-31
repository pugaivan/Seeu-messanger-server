exports.decoded = (authorization, key, jwt) => {
  return jwt.verify(authorization, key);
}