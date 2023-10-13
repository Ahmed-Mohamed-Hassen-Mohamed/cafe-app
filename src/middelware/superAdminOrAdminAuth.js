const requireSuperAdminOrAdminAuth = async (req, res, next) => {
  if (req.user.roles == 0 || req.user.roles == 1) {
    next();
  } else {
    res.status(401).send({ error: "Not Super Admin or Admin" });
  }
};
module.exports = requireSuperAdminOrAdminAuth;
