express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
/* GET home page. */
  router.post('/productdetail_submit',upload.single('picture'), function(req, res, next) {
               try{
                    pool.query("insert into productdetails(categoryid, subcategoryid, brandid, productid, productdetailname, weight, weighttype, packagingtype, noofqty, stock, price, offerprice, offertype, productstatus, productdetaildescription, picture, created_at, updated_at, user_admin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin],function(error,result){
                           if(error)
                            {console.log(error)
                              res.status(200).json({message:'Database error please contact with backendteam...'+error,status:false})
                            }
                            else
                            {
                              res.status(200).json({message:'Productdetails submitted successfully..',status:true})
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
router.get('/display_all_productdetail', function(req, res, next) {
  try{
       pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid ) as brandname,(select P.productname from products P where P.productid=PD.productid ) as productname from productdetails PD",function(error,result){
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




router.post('/edit_productdetail_data', function(req, res, next) {
  try{
       pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, productdetailname=?, weight=?, weighttype=?, packagingtype=?, noofqty=?, stock=?, price=?, offerprice=?, offertype=?, productstatus=?, productdetaildescription=?, updated_at=?, user_admin=? where productdetailid=? ",[ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.body.updated_at, req.body.user_admin,req.body.productdetailid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'Productdetails updated successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});




router.post('/edit_productdetail_icon',upload.single('picture'), function(req, res, next) {
  try{
       pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, picture=? , updated_at=?, user_admin=? where productdetailid=? ",[ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.file.filename, req.body.updated_at, req.body.user_admin, req.body.productdetailid],function(error,result){
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





router.post('/delete_productdetail', function(req, res, next) {
  try{
       pool.query("delete from productdetails where productdetailid=? ",[req.body.productdetailid],function(error,result){
              if(error)
               {console.log(error)
                 res.status(200).json({message:'Database error please contact with backendteam...',status:false})
               }
               else
               {
                 res.status(200).json({message:'productdetailListRow deleted successfully..',status:true})
               }
       })
  }
  catch(e)
  {
               res.status(200).json({message:'Severe error on server please contact with backendteam..',status:false})
  }
});



router.post('/get_all_productdetail_by_productid', function(req, res, next) {
  try{
       pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid ) as brandname,(select P.productname from products P where P.productid=PD.productid ) as productname from productdetails PD where PD.productid=?",[req.body.productid],function(error,result){
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