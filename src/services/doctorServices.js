import bcrypt from "bcrypt";
import doctorRepositories from "../repositories/doctorRepositories.js";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";

async function create({ name, email, password, speciality }) {  
  const { rowCount } = await doctorRepositories.findByEmail(email);   
  if (rowCount) throw errors.duplicatedEmailError(email);  
  
  const checkSpeciality = await doctorRepositories.findBySpeciality(speciality.toLowerCase());      
  
  if (!checkSpeciality.rowCount) throw errors.medicalSpecialityError(speciality);   
  const speciality_id = checkSpeciality.rows[0].id
  

  const hashPassword = await bcrypt.hash(password, 10);
  await doctorRepositories.create({ name, email, password: hashPassword, speciality_id });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await doctorRepositories.findByEmail(email);
  
  if (!rowCount) throw errors.invalidCredentialsError();
  

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await doctorRepositories.createSession({ token, user_id: user.id });

  return token;
}

export default {
  create,
  signin,
};
