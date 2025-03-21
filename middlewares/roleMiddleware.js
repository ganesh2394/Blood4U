module.exports = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.body.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: You are not authorized",
        });
      }
      next();
    };
  };
  