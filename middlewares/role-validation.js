import { request, response } from "express";


export const isAdminRole = (req = request, res = response, next) => {

  if(!req.user) {
    return res.status(500).json({
      msg: 'Verify token first'
    });
  }

  const { role, name } = req.user;
  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an administrator`
    });
  }
  next();
}

export const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Verify token first'
      });
    }
    
    if(!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles: ${roles}`
      });
    }

    next();
  }
}