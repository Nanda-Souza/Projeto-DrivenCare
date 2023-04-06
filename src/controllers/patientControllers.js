import patientServices from "../services/patientServices.js";

async function create(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await patientServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function searchDoctorName(req, res, next) {  
  const { doc_name } = req.body;
    
  try {    
    const result = await patientServices.searchDocName({ doc_name });
    console.log(result)
    return res.send({ result });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
  searchDoctorName,
};
