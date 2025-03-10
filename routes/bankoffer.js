var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
/* GET home page. */
router.post('/bankoffer_submit',upload.single('filenames'), function(req, res, next) {
  try{
       pool.query("insert into bankandotheroffers (status, filenames, created_at, updated_at, user_admin) values(?,?,?,?,?)",[ req.body.status, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Bankandotheroffers submitted successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});



module.exports = router;