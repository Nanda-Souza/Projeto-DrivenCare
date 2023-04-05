import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config"


async function create({ name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await patientRepositories.findByEmail(email);
  
  if (!rowCount) throw errors.invalidCredentialsError();
  

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ user_id: user.id, profile: "patient" }, process.env.SECRET_JWT, {expiresIn: 86400 }); // Secret key is a SHA-256

  return token;
}

export default {
  create,
  signin,
};
