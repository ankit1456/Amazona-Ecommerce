const fs = require("fs");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const router = express.Router();

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data.json`, "utf-8")
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const newProducts = await Product.create(products);
    res.status(200).json({
      status: "success",
      newProducts,
    });
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(400).json({
        status: "fail",
        message: "Product not found",
      });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  })
);

module.exports = router;
