import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;


export const isAuthenticated = async (req:any, res:any, next:any) => {
    
    let token;
    let decoded;
    // const authHeader = req.header.authorization; //req.get('Authorization');

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } 
  
      if (!token) return false;

      if(secret) {
         decoded = jwt.verify(token, secret);
      }
     

      if (!decoded) return false;

    return true;


}