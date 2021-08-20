const Course = require('../models/Course');
const {mutilpleMongooseToObject} = require('../../util/mongoose');
class SiteController{

    //[Get] /
    index(req, res, next){  
        Course.find({})
            // .then(courses => res.send(courses))
            .then(courses => res.render('home', { courses: mutilpleMongooseToObject(courses) }))
            .catch(next)
    }

    //[Get] /search
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;
