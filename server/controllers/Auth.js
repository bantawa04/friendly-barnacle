import bcrypt from "bcrypt";
import { body, check, validationResult } from "express-validator";

import User from "../models/Users";
import { getUserToken, getUserByEmail } from "./User";

const validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("email", "Invalid Email").exists().trim().isEmail(),
        check("password")
          .exists()
          .trim()
          .isLength({ min: 6 })
          .withMessage(
            "Invalid Password! Password should contain least 6 characters."
          ),
        body("name", "Please add user`s name.").exists().trim().notEmpty(),
        body("address", "Please enter address.").exists().trim(),
        body("phone", "Invalid phone number.")
          .exists()
          .trim()
          .isNumeric()
          .isLength({ min: 6, max: 12 }),
      ];
    }
    case "login": {
      return [
        body("email", "Invalid Email").exists().trim().isEmail(),
        body(
          "password",
          "Invalid Password! Password should contain least 6 characters."
        )
          .trim()
          .isLength({ min: 6 }),
      ];
    }
  }
};

const getErrorsFromValidationErrors = (validationErrors) => {
  const errors = validationErrors.map((error) => ({
    location: error.param,
    message: error.msg,
  }));
  return errors;
};

const registerUser = async (userInfo) => {
  const { name, address, email, password, phone, role } = userInfo;
  try {
    const newUser = new User({
      name,
      address,
      email,
      password,
      phone,
      role,
    });
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await newUser.save();
    return {
      user: newUser,
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};

const register = async (req, res) => {
  const { email } = req.body;
  try {
    const validationErrors = await validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = getErrorsFromValidationErrors(validationErrors.array());
      return res.status(400).json({
        isSuccess: false,
        message: errors,
      });
    }
    const userByEmail = await getUserByEmail(email);
    if (userByEmail.user)
      return res.status(400).json({
        isSuccess: false,
        message: "User with the same email exists.",
      });
    const newUser = await registerUser(req.body);
    if (newUser.isSuccess) {
      return res.status(200).json({
        isSuccess: true,
        message: "Sucessfully registered",
        data: newUser.user,
      });
    } else {
      return res
        .status(400)
        .json({ isSuccess: false, message: newUser.message });
    }
  } catch (err) {
    return res.status(400).json({ isSuccess: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = getErrorsFromValidationErrors(validationErrors.array());
      return res.status(400).json({
        isSuccess: false,
        message: errors,
      });
    }
    const { user } = await getUserByEmail(email);
    if (!user)
      return res.status(401).json({
        isSuccess: false,
        message: "User associated with the given email doesnot exist.",
      });
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err || !result)
        return res.status(401).json({
          isSuccess: false,
          message: "Wrong Username or Password!",
        });
      const { password, ...rest } = user._doc;
      const token = await getUserToken(rest.email);
      rest.token = token;
      return res.status(200).json({
        isSuccess: true,
        message: "Login Successful",
        data: {
          user: {
            ...rest,
          },
        },
      });
    });
  } catch (error) {
    res.status(401).json({ isSuccess: false, message: "Login Failed!" });
  }
};

export { validate, register, login };
