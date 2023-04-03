import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
//import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";

async function create({ name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword });
}
/*
async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await userRepositories.createSession({ token, userId: user.id });

  return token;
}
*/
export default {
  create,
  //signin,
};
