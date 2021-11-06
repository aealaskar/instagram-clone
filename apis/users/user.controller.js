const UserV2 = require("../../models/UserV2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

const tokenGenerator = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await UserV2.create(req.body);

    const token = tokenGenerator(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const token = tokenGenerator(req.body);
  res.json({ token });
};
