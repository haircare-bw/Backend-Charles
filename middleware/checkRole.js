module.exports = role => {
    return (req, res, next) => {
        if(req.user){
            if(
                req.user.roles && Array.isArray(req.user.roles) && req.user.roles.includes(role)
            ) {
                next();
            } else {
                res.status(403).json({ message: " you don't have access here" });
            }
        } else {
            res.status(401).json({ message: 'you do not the Creds for this'});
        }
    };
};
