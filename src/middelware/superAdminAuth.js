const requireSuperAdmin = async (req, res, next) => {
  if (req.user.roles != 0) {
    res.status(401).send({ error: "Not Admin" });
  } else {
    next();
  }
};
module.exports = requireSuperAdmin;
