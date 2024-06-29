import jwt from "jsonwebtoken";
import notifier from "node-notifier";

const checkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "TOP SECRETS", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/auth/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/auth");
  }
};
const checkTokenHome = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    const tok = jwt.verify(token, "TOP SECRETS");
    if (tok) {
      res.redirect("/blog");
    }
    next();
  } else {
    if (req.originalUrl == "/") {
      notifier.notify({
        title: "Alert!",
        message: "Please Register Or Login You'r Self!",
        sound: true,
        wait: true,
      });
    }
    next();
  }
};

const auth = { checkToken, checkTokenHome };

export { checkTokenHome, checkToken };
