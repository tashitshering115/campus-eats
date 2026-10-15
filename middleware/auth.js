
exports.requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.redirect('/login');
};

exports.requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'admin') {
    return res.status(403).send(
      'Access Denied: Admin privileges required.'
    );
  }

  return next();
};

exports.requireSuperAdmin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'superadmin') {
    return res.status(403).send(
      'Access Denied: Superadmin privileges required.'
    );
  }

  return next();
};

