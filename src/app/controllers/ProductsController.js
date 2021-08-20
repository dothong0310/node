
class ProductsController{
    index(req, res){
        res.render('products')
    }

    getId(req, res){
        res.send(req.query);
    }
}

module.exports = new ProductsController;