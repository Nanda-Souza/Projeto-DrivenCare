import errors from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";
import jwt from "jsonwebtoken";

async function authValidationPatient(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts
  if (schema !== "Bearer") throw errors.unauthorizedError();


jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
  
  try {
    
    if (error) throw errors.unauthorizedError();        
    
    if (decoded.profile !== "patient") throw errors.invalidProfileError();
    
    const {
      rows: [user],
    } = await patientRepositories.findById(decoded.user_id);
    
    if (!user) throw errors.notFoundError();
    
    res.locals.user = user;
    
    next();
  } catch (err) {
    next(err);
  }
  });
}

export default { authValidationPatient };
