import connectionDb from "../config/database.js";

async function findByEmail(email) {  
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function findBySpeciality(speciality) {
  return await connectionDb.query(
    `    
    SELECT id FROM speciality WHERE LOWER(medical_specialties)=$1
  `,
    [speciality]
  );
}


async function create({ name, email, password, speciality_id }) {
  const result = await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3) RETURNING id
    `,
    [name, email, password]
  );

  const user_id = result.rows[0].id;  

  await connectionDb.query(
    `
        INSERT INTO doctors (user_id, speciality_id)
        VALUES ($1, $2)
    `,
    [user_id, speciality_id]
  );
}

async function createSession({ token, user_id }) {
  await connectionDb.query(
    `
        INSERT INTO sessions (token, user_id)
        VALUES ($1, $2)
    `,
    [token, user_id]
  );
}
/*
async function findSessionByToken(token) {
  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
}
*/
export default {
  findByEmail,
  create,
  createSession,
  findBySpeciality,
  /*findById,
  findSessionByToken,*/
};
