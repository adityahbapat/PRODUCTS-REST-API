// const express = require('express');
// const router = express.Router();

// //  /products 
// router.get('/',(req,res, next) =>{
//     res.status(200).json({
//         message: 'Product route for Get handled successfully by router.'
//     })
// } );

// router.post('/',(req,res, next) =>{
//     const product = {
//         name: req.body.name,
//         price: req.body.price
//     }

//     res.status(200).json({
//         message: 'Product Created successfully',
//         createdProduct: product
//     })
// });

// router.get('/:productId',(req,res, next) =>{
//     const id = req.params.productId;

// });

// router.patch('/:productId',(req,res, next) =>{
//     const id = req.params.productId;
    
// });

// router.delete('/:productId',(req,res, next) =>{
//     const id = req.params.productId;
    
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require('multer'); // multer for accepting images
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", ProductsController.products_get_all);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get("/:productId", ProductsController.products_get_product);

router.patch("/:productId", checkAuth, ProductsController.products_update_product);

router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;