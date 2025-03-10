express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')


/* GET home page. */
  router.post('/product_submit',upload.single('picture'), function(req, res, next) {
               try{
                    pool.query("insert into products(categoryid, subcategoryid, brandid, productname, productdescription, picture,created_at, updated_at, user_admin) values(?,?,?,?,?,?,?,?,?)",[req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productname, req.body.productdescription, req.file.filename,req.body.created_at, req.body.updated_at, req.body.user_admin],function(error,result){
                           if(error)
                            {console.log(error)
                              res.status(200).json({message:'Database error please contact with backendteam...'+error,status:false})
                            }
                            else
                            {
                              res.status(200).json({message:'Products submitted successfully..',status:true})
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
router.get('/display_all_product', function(req, res, next) {
  try{
       pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid ) as brandname from products P",function(error,result){
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




router.post('/edit_product_data', function(req, res, next) {
  try{
       pool.query("update products set categoryid=?,subcategoryid=?,brandid=?,productname=?,productdescription=?, updated_at=?, user_admin=? where productid=? ",[ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productname, req.body.productdescription,  req.body.updated_at,  req.body.user_admin, req.body.productid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Products updated successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});




router.post('/edit_product_icon',upload.single('picture'), function(req, res, next) {
  try{
       pool.query("update products set categoryid=?,subcategoryid=?,brandid=?,picture=?,productdescription=?, updated_at=?, user_admin=?  where productid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.brandid, req.file.filename, req.body.productdescription, req.body.updated_at,  req.body.user_admin, req.body.productid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Picture updated successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});





router.post('/delete_product', function(req, res, next) {
  try{
       pool.query("delete from products where productid=? ",[req.body.productid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'ProductlistRow deleted successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});



router.post('/get_all_product_by_brandid', function(req, res, next) {
  try{
       pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid ) as brandname from products P where P.brandid=?",[req.body.brandid],function(error,result){
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