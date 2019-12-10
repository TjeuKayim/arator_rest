const userRepo = require("../data/repo/user_repo");
const passwordService = require("../services/password_service");
const validator = require("validator");

const MAX_PASSWORD_LENGTH = 25;
const MIN_PASSWORD_LENGTH = 6;

function validateUserCredentials(user) {
  if (!validator.isEmail(user.email)) {
    throw new Error("The email address given is not a valid");
  }
  if (!validator.isLength(user.password, { min: MIN_PASSWORD_LENGTH })) {
    throw new Error(
      `The length of your password should be longer than ${MIN_PASSWORD_LENGTH} characters`
    );
  }
  if (!validator.isLength(user.password, { max: MAX_PASSWORD_LENGTH })) {
    throw new Error(
      `The length of your password shouldn't be longer than ${MAX_PASSWORD_LENGTH} characters`
    );
  }
  if (user.password !== user.confirmPassword) {
    throw new Error(
      "The given password was not identical to the confirmation password"
    );
  }
}

async function passwordIsCorrect(user) {
  try {
    const userFromDb = await userRepo.fetchUser(user.email);
    return userFromDb.passwordHash === user.passwordHash;
  } catch (err) {
    throw new Error("Password was incorrect");
  }
}

module.exports = {
  async registerUser(user) {
    try {
      validateUserCredentials(user);
      user.password = passwordService.hashAndSalt(user.password);
      await userRepo.insertUser(user);
    } catch (err) {
      throw new Error(err);
    }
  },
  async authenticateUser(user) {
    user.password = passwordService.hashAndSalt(user.password);
    passwordIsCorrect(user);
  },
  async userList() {
    return await userRepo.fetchUsers();
  }
};
