const Course = require('../models/Course');
const {mutilpleMongooseToObject} = require('../../util/mongoose');

class MeController{

    //[Get] /me/store/courses
    storedCourses(req, res, next){
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount])=>{
                res.render('me/stored-courses', {
                    courses: mutilpleMongooseToObject(courses),
                    deleteCount,
                })
            })
            .catch(next)
        
    }

    //[Get] /me/trash/courses
    trashCourses(req, res, next){
        Course.findDeleted({})
            .then((courses)=>{res.render('me/trash-courses', {courses: mutilpleMongooseToObject(courses)})})
            .catch(next)
    }
}

module.exports = new MeController;