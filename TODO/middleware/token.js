import jwt from "jsonwebtoken";


const checkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "TOP SECRETS", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/auth")
      } else {    
        next()
      }
  });
  } else {
    res.redirect("/auth");
  }
  // next()
};

// const auth = { checkToken, checkTokenHome };

export {  checkToken };
