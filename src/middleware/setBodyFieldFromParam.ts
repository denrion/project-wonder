// Used as middleware to set a body field
// equal to specifed path variable (param) name
// e.g used to connect a new resource with another resource

import { RequestHandler } from 'express';

// specified as a path variable in url when using nested routes
const setBodyFieldFromParam = (fieldName: string = '', paramName: string = ''): RequestHandler => (
  req,
  res,
  next
) => {
  if (!req.body[fieldName]) req.body[fieldName] = req.params[paramName];
  next();
};

export default setBodyFieldFromParam;
