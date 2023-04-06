import connectionDb from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
    AND id NOT IN (SELECT user_id FROM doctors)
  `,
    [email]
  );
}

async function create({ name, email, password }) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
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

async function findDoctorByName(doc_name) {
  return await connectionDb.query(
    `
    select 
    u.name as "doctor_name",
    s.medical_specialties,
    a.street,
    a.number,
    a.complemento,
    c.name as city_name,
    st.name as state_name
  from users u
  JOIN doctors d on u.id = d.user_id
  JOIN speciality s on s.id = d.speciality_id
  JOIN address a on d.id = a.doctor_id
  JOIN cities c on c.id = a.city_id
  JOIN states st on st.id = c.state_id
  WHERE u.name = $1
    `,
    [doc_name]
  );
}


async function findById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
    AND id NOT IN (SELECT user_id FROM doctors)
  `,
    [id]
  );
}

    
export default {
  findByEmail,
  create,
  createSession,
  findById,
  findDoctorByName,
};
