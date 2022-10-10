import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;


export const isAuthenticated = async (token: string) => {
    
    let decoded:any;
    // const authHeader = req.header.authorization; //req.get('Authorization');

    if (!token) return null;

    // console.log(secret);

    if(secret) {
      decoded = jwt.verify(token, secret);
    }
    // OR
    // decoded = jwt.verify(token, secret!);   

    if(!decoded) return null;
    
    console.log('verification', decoded);

    return await decoded;


}