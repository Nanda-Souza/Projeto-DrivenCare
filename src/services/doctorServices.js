import bcrypt from "bcrypt";
import doctorRepositories from "../repositories/doctorRepositories.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

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

  const token = jwt.sign({ user_id: user.id, profile: "doctor" }, process.env.SECRET_JWT, {expiresIn: 86400 }); // Secret key is a SHA-256

  return token;
}

export default {
  create,
  signin,
};
