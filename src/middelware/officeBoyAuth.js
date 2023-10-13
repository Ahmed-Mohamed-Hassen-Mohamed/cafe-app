const requireOfficeBoy = async (req, res, next) => {
  if (req.user.roles != 3) {
    res.status(401).send({ error: "Not Office Boy" });
  } else {
    next();
  }
};
module.exports = requireOfficeBoy;
