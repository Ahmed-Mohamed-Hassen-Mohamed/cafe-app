const requireEmployee = async (req, res, next) => {
  if (req.user.roles != 2) {
    res.status(401).send({ error: "Not Employee" });
  } else {
    next();
  }
};
module.exports = requireEmployee;
