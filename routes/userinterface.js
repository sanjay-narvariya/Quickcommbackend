var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post('/user_display_all_category', function (req, res, next) {
  try {
    if (req.body.status == "all")
      q = "select * from category"
    else if (req.body.status == "limit")
      q = "select * from category limit 7"

    pool.query(q, function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.post('/user_get_all_subcategory_by_categoryid', function (req, res, next) {
  try {
    pool.query("select SC.*,(select C.categoryname from category C where C.categoryid=SC.categoryid ) as categoryname from subcategory SC where SC.categoryid=?", [req.body.categoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        console.log(result)
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.get('/show_all_banner', function (req, res, next) {
  try {

    pool.query("select * from mainbanner where status='show'", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});


router.get('/show_all_bankOffer', function (req, res, next) {
  try {

    pool.query("select * from bankandotheroffers where status='show'", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});


router.get('/all_adoffers', function (req, res, next) {
  try {

    pool.query("select * from adoffers", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});


router.post('/display_all_productdetail_by_status', function (req, res, next) {
  try {
    pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid ) as brandname,(select P.productname from products P where P.productid=PD.productid ) as productname from productdetails PD where PD.productstatus=?", [req.body.productstatus], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..' + e, status: false })
  }
});



router.get('/user_display_all_subcategory', function (req, res, next) {
  try {
    q = "select * from subcategory"
    pool.query(q, function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});

router.post('/user_get_all_brand_by_subcategoryid', function (req, res, next) {
  try {
    pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid ) as subcategoryname from brands B where B.subcategoryid=?", [req.body.subcategoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
      }
      else {
        console.log(result)
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.post('/user_display_product_details_by_subcategory', function (req, res, next) {
  try {

    pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid ) as brandname,(select P.productname from products P where P.productid=PD.productid ) as productname from productdetails PD where PD.subcategoryid=?", [req.body.subcategoryid],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          res.status(200).json({ message: 'Success', data: result, status: true })
        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});


router.post('/user_display_product_details_by_id', function (req, res, next) {
  try {

    pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid ) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname,(select B.brandname from brands B where B.brandid=PD.brandid ) as brandname,(select P.productname from products P where P.productid=PD.productid ) as productname from productdetails PD where PD.productid=?", [req.body.productid],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          res.status(200).json({ message: 'Success', data: result, status: true })
        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});


router.post('/user_display_product_pictures', function (req, res, next) {
  try {

    pool.query("select * from productpictures where productdetailid=?", [req.body.productdetailid],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          res.status(200).json({ message: 'Success', data: result, status: true })
        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});




router.post('/check_user_mobileno', function (req, res, next) {
  console.log(req.body)
  try {

    pool.query("select * from usersdata where mobileno=?", [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(500).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          if (result.length == 1) {
            res.status(200).json({ message: 'Mobile no is exist', data: result[0], status: true })
          }
          else {
            res.status(200).json({ message: 'Mobile no is not exist', data: [], status: false })
          }
        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.post('/submit_user_data', function (req, res, next) {
  try {

    pool.query("insert into usersdata(firstname, lastname, gender, emailaddress, dob, mobileno) values(?,?,?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.gender, req.body.emailaddress, req.body.dob, req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(500).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          console.log(result)
          res.status(200).json({ message: 'Successfully Registered...', status: true, userid: result.insertId })

        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.post('/check_user_address', function (req, res, next) {
  try {
    console.log("DATA:", req.body)
    pool.query("select * from useraddress where userid=?", [req.body.userid],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(500).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          if (result.length >= 1) {
            res.status(200).json({ message: 'Address is found', data: result, status: true })
          }
          else {
            res.status(200).json({ message: 'Address is not found', data: [], status: false })
          }
        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



router.post('/submit_user_address', function (req, res, next) {
  try {

    pool.query("insert into useraddress(userid, pincode, houseno, floorno, towerno, building, address, landmark, city, state) values(?,?,?,?,?,?,?,?,?,?)", [req.body.userid, req.body.pincode, req.body.houseno, req.body.floorno, req.body.towerno, req.body.building, req.body.address, req.body.landmark, req.body.city, req.body.state],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(200).json({ message: 'Database error please contact with backendteam...', status: false })
        }
        else {
          console.log(result)
          res.status(200).json({ message: 'Address successfully submitted..', status: true, userid: result.insertId })

        }
      })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server please contact with backendteam..', status: false })
  }
});



module.exports = router;
