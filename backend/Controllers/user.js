const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try { 
    const newUser = new User({ name, lastName, email, password});
    //check if the email exist
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "User already exist" });
    }

    //hash password

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    console.log(hashedPassword);
    newUser.password = hashedPassword;
    //save the user
    const newUserToken = await newUser.save();
    //generate a token
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };

    const token = jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 8000,
    });
    console.log(token);
    res 
      .status(200)
      .send({ newUserToken, msg: "user is saved", token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.send(error);
    res.status(500).send({ msg: "Can not save the user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find if the user exist
    const searchedUser = await User.findOne({ email });
    //find if the email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "Bad credential" });
    }
    //if password are equal
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Bad credential" });
    }
    //creer un token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    //console.log(token)
    //send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ msg: "Can not get the user" });
  }
};
exports.current = (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (error) {
    console.log(error);
  }
};
exports.getUsers = async (req, res) => {
  try {
    let result = await User.find();
    res.send({ result: result, msg: "all users" });
  } catch (error) {
    res.send("error");
  }
};
//delete One User
exports.deleteOneUser = async (req, res) => {
  try {
    let result = await User.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ result: result, msg: "user deleted" })
      : res.send({ result: result, msg: "already deleted" });
  } catch (error) {
    res.send("error");
  }
};
//update one user
exports.updateUser = async (req, res) => {
  try {
    let result = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ result: result, msg: "user updated" });
  } catch (error) {
    res.send("error");
  }
};







