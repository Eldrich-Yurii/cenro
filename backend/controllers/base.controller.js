export const create = (request, response) => {
  response.send("POST > create response from controller.");
};

export const findAll = (request, response) => {
  response.send("GET ALL Request Received.");
};

// retrieve a single
export const findOne = (request, response) => {
  // http://localhost:8000/api/baseRoutes/{id}
  response.send("GET ONE Request Received.");
};

// update
export const update = (request, response) => {
  // http://localhost:8000/api/baseRoutes/{id}
  response.send("UPDATE ONE Request Received.");
};

// delete all
export const deleteAll = (request, response) => {
  // http://localhost:8000/api/baseRoutes/
  response.send("DELETE ALL Request Received.");
};

// delete a single
export const deleteOne = (request, response) => {
  // http://localhost:8000/api/baseRoutes/{id}
  response.send("DELETE ONE Request Received.");
};
