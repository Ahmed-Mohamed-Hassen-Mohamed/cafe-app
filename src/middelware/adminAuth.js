const requireAdmin = async (req, res, next) => {
  if (req.user.roles != 1) {
    res.status(401).send({ error: "Not Super Admin" });
  } else {
    next();
  }
};
module.exports = requireAdmin;
