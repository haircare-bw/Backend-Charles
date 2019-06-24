//ValidateUserId
function validateUserId(req, res, next) {
    const ID = req.params.id
       Users
       .getById(ID)
       .then( user => {
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400).json({ message: 'invalid user id' })
        }
       })
       .catch(err => {
           res.status(500).json({err})
       }) 
};
//ValidateUser
function validateUser(req, res, next) {
        if (req.body) {
            if (req.body.username) {
                next();
            }
            else {
                res.status(400).json({
                    message: 'Missing required name field.'
                });
            }
        }
        else {
            res.status(400).json({message: 'Missing user data.'});
        }
};