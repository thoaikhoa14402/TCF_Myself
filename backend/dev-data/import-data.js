/* eslint-disable */
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config.env' });

// connecting to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB successfully!'));

let products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

const extensionFile = {
  apng: 'image/apng',
  avif: 'image/avif',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  jfif: 'image/jpeg',
  pjpeg: 'image/jpeg',
  pjg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  cur: 'image/x-icon',
  tiff: 'image/tiff',
  tif: 'image/tiff',
};

products = products.map((categoryEl) => {
  categoryEl.proType = categoryEl.proType.map((typeEl) => {
    typeEl.products = typeEl.products.map((productEl) => {
      const imgPath = productEl.img;
      productEl.img = `data:${
        extensionFile[imgPath.substring(imgPath.lastIndexOf('.')).split('.')[1].toLowerCase()]
      };base64,${fs.readFileSync(`${__dirname}/${imgPath}`, 'base64')}`;
      return productEl;
    });
    return typeEl;
  });
  return categoryEl;
});

// const DATA INTO DB
const importProducts = async () => {
  try {
    await Product.insertMany(products);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteUsers = () => {};
const deleteShoppingCarts = () => {};
const deleteOrders = () => {};

if (process.argv[2] === 'importProducts') {
  importProducts();
} else if (process.argv[2] === 'deleteProducts') {
  deleteProducts();
} else if (process.argv[2] === 'deleteUsers') {
  deleteUsers();
} else if (process.argv[2] === 'deleteShoppingCarts') {
  deleteShoppingCarts();
} else if (process.argv[2] === 'deleteOrders') {
  deleteOrders();
}
