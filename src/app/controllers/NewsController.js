

class NewsController{

    //[Get] /news
    index(req, res){
        res.render('news');
    }

    
    show(req, res){
        res.send('tesst');
    }
}

module.exports = new NewsController;