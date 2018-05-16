var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '网站首页'});
});
/*首页*/
router.get('/index.html', function (req, res, next) {
    res.render('index', {title: '网站首页'});
});
/*新闻中心*/
router.get('/news/index.html', function (req, res, next) {
    res.render('news/index', {title: 'About'});
});
router.get('/news/detail.html', function (req, res, next) {
    res.render('news/detail', {title: 'About'});
});
/*产品服务*/
router.get('/product/index.html', function (req, res, next) {
    res.render('product/index', {title: 'About'});
});
/*关于我们*/
router.get('/about/index.html', function (req, res, next) {
    res.render('about/index', {title: 'About'});
});
/*联系我们*/
router.get('/contact/index.html', function (req, res, next) {
    res.render('contact/contact_us', {title: 'About'});
});


module.exports = router;
