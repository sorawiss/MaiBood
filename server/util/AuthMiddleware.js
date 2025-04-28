import jwt from 'jsonwebtoken'


function AuthMiddleware(req, res, next) {
    const token = req.cookies.token;
    const SECRET_KEY = process.env.TOKEN;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, no token' });
    }


    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userID = decoded.userId;
        next();

    }
    catch(error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized, invalid token' + error });
    }
}



export default AuthMiddleware