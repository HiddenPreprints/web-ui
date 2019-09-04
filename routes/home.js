module.exports = (req, res, next) => {
  const categories = [
    'physiology',
    'evolutionary-biology',
    'microbiology',
    'systems-biology',
    'cell-biology',
    'epidemiology'
  ];

  res.render('home', { categories });
}
