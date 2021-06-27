var express = require('express');
var router = express.Router();

var connection = require('../library/database');


// view index posts
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM posts ORDER BY id DESC', function(err,rows){
        if(err){
            req.flash('error',err);
            res.render('posts',{
                data:''
            });

        }else{

            res.render('posts/index',{
                data:rows
            });
        }
    });    
});

// create 
router.get('/create', function (req,res,next){
    res.render('posts/create',{

    })
})


//store
router.post('/store', function (req,res,next){
   
    let title   = req.body.title;
    let content = req.body.content;
    let errors  = false;

    if(title.length === 0 || content.length === 0 ) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Title / Konten");
        res.render('posts/create')
    }

    if(!errors) {

        const formData = {
            title: title,
            content: content
        }

        connection.query('INSERT INTO posts SET ?' , formData , function(err,result){
            
            if(err) {
                req.flash('error',err)
                res.render('posts/create')

            } else {
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/posts');
            }
        })
    }

})

router.get('/detail/(:id)', function(req,res,next) {
    
    const id = req.params.id;
    connection.query('SELECT * FROM posts WHERE id  = '+ id, function(err, rows, fields ){

        if(err) throw err

        if(rows.length === 0) {
            
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/posts')

        } else {
            req.flash('success', 'Data Berhasil Dihapus !');
            res.render('posts/detail',{
                id: rows[0].id,
                title: rows[0].title,
                content: rows[0].content
            })
        }
    })
})


router.get('/delete/(:id)', function(req,res,next) {
    
    const id = req.params.id;
    connection.query('DELETE FROM posts WHERE id  = '+ id, function(err, result ){
        if(err) {
            req.flash('error',err)
            res.render('posts/create')

        } else {
            req.flash('success', 'Data Berhasil Dihapus !');
            res.redirect('/posts');
        }
    })
})





module.exports = router;
