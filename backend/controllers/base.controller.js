exports.create = (request, response) => {
    res.send('POST > create response from controller.');
  };

exports.findAll = (request, response) => {
    response.send('GET ALL Request Received.')
};

// retrieve a single  
exports.findOne = (request, response) => { // http://localhost:8000/api/baseRoutes/{id}
  res.send('GET ONE Request Received.');
};

// update a 
exports.update = (request, response) => { // http://localhost:8000/api/baseRoutes/{id}
  res.send('UPDATE ONE Request Received.');
};

// delete all 
exports.deleteAll = (request, response) => { // http://localhost:8000/api/baseRoutes/
  res.send('DELETE ALL Request Received.');
};

// delete a single 
exports.deleteOne = (request, response) => { // http://localhost:8000/api/baseRoutes/{id}
  res.send('DELETE ONE Request Received.');
};