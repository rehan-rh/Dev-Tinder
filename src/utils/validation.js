const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid..");
  }
  // else if(firstName.length<4 || firstName.length>50)
  // {
  //     throw new Error("First name should be 4-50 characters...");// we can use this directly in model also...
  // }
  else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid..");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter the strong password...!");
  }
};

module.exports = {
    validateSignUpData,
}