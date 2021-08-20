const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');

class CourseController{

    //[Get] /courses/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
                // res.send(course);
            })
            .catch(next)
    }

    //[Get] /courses/create
    create(req, res, next){
        res.render('courses/create');
    }

    //[post] /courses/store
    store(req, res, next){
        req.body.img =`https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body)
        course.save()
            .then(()=>{ res.redirect('/me/store/courses')})
            .catch(next)        
    }

    //[Get] /courses/edit
    edit(req, res, next){
        Course.findOne({_id: req.params.id})
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)
    }

     //[Put] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/store/courses'))
            .catch(next);
    }

    //[Delete] /courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }

    //[Patch] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }

    //[Delete] /courses/:id/force
    deleteForce(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    
    //[Post] /courses/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: { $in: req.body.coursesIds} })
                    .then(()=> res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: "lỗi"});
        }
    }
}

module.exports = new CourseController;
