exports.getIndex = async (req, res) => {
  console.log(req.session);
  res.render('index', { pageTitle: 'EShop', path: '/' });
};
