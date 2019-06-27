module.exports  = (req, res, next) => {
        if(req.user){
            if(
                req.user  && req.user.stylist
            ) {
                next();
            } else {
                console.log(req.user)
                res.status(403).json({ message: " you don't have access here" });
            }
        } else {
            console.log(req.user);
            res.status(401).json({ message: 'you do not have the Credentials for this'});
        }
    };

