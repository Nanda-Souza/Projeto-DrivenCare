function conflictError(message) {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
    email,
  };
}

function medicalSpecialityError(speciality) {  
  return {
    name: "MedicalSpecialityError",
    message: "The medical speciality provided is not registered",
    speciality,    
  };
}


/*
function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}*/

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  medicalSpecialityError,
  //unauthorizedError,
  //notFoundError,
  invalidCredentialsError,
};
