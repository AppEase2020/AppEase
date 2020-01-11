const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied, no token provided');

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
            if(err){
                return res.status(400).send('Invalid Token');
            }
        });
        try{
            req.user = await jwt.decode(token);
            next();
        }
        catch(err){
            return res.send(err.message);
        }
}
