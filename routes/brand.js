express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
/* GET home page. */
  router.post('/brand_submit',upload.single('brandicon'), function(req, res, next) {
               try{
                    pool.query("insert into brands( categoryid, subcategoryid, brandname, brandicon, created_at, updated_at, user_admin) values(?,?,?,?,?,?,?)",[req.body.categoryid, req.body.subcategoryid, req.body.brandname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin],function(error,result){
                           if(error)
                            {console.log(error)
                              res.status(200).json({message:'Database error please contact with backendteam...'+error,status:false})
                            }
                            else
                            {
                              res.status(200).json({message:'Brands submitted successfully..',status:true})
                            }
                    })
               }
               catch(e)
               {
                            res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
               }
             });





 /* router.post('/get_all_subcategory_by_categoryid', function(req, res, next) {
              try{
                   pool.query("select * from subcategory where categoryid = (select categoryid from category where categoryid=?)",[req.body.categoryid],function(error,result){
                          if(error)
                           {console.log(error)
                             res.status(200).json({message:'Database error please contact with backendteam...',status:false})
                           }
                           else
                           {console.log(result)
                             res.status(200).json({message:'Success',data:result,status:true})
                           }
                   })
              }
              catch(e)
              {
                           res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
              }
            });
*/
router.get('/display_all_brand', function(req, res, next) {
  try{
       pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid ) as subcategoryname from brands B",function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Success',data:result,status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});




router.post('/edit_brand_data', function(req, res, next) {
  try{
       pool.query("update brands set categoryid=?,subcategoryid=?,brandname=?,updated_at=?, user_admin=? where brandid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.brandname, req.body.updated_at, req.body.user_admin, req.body.brandid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Brands updated successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});




router.post('/edit_brand_icon',upload.single('brandicon'), function(req, res, next) {
  try{
       pool.query("update brands set categoryid=?,subcategoryid=?,brandicon=?,updated_at=?, user_admin=? where brandid=? ",[req.body.categoryid,req.body.subcategoryid, req.file.filename, req.body.updated_at, req.body.user_admin, req.body.brandid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Brandicon updated successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});





router.post('/delete_brand', function(req, res, next) {
  try{
       pool.query("delete from brands where brandid=? ",[req.body.brandid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'BrandlistRow deleted successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});



router.post('/get_all_brand_by_subcategoryid', function(req, res, next) {
  try{
       pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid ) as subcategoryname from brands B where B.subcategoryid=?",[req.body.subcategoryid],function(error,result){
              if(error)
               {console.log(error) 
                res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {console.log(result)
                 res.status(200).json({message:'Success',data:result,status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});


             module.exports = router;