/* eslint object-shorthand: 0 */
/* eslint no-unused-vars: 0 */
const User = require('../api/user/userModel');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {  
  const token = signToken(req.user.id);
  const username = req.user.username;
  res.json({ 
    user:
        {
            token,
            username
        }
   });
};
