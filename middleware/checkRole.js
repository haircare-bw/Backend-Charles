module.exports = type => {
    return (req, res, next) => {
        if(req.user){
            if(
                req.user.type && Array.isArray(req.user.type) && req.user.type.includes(stylist)
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
