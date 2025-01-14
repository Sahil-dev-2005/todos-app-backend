const jwt = require('jsonwebtoken');
const JWT_SECRET = "NoHate@12345";

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    if(!decodedData){
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    } else{
        req.email = decodedData.email;
        next();
    }
}

module.exports = {
    auth,
    JWT_SECRET
}