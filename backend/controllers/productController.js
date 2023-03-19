import catchAsync from '../utilities/catchAsync.js';
import Product from '../models/productModel.js';

export const sendProductData = catchAsync(async (req, res, next) => {
  const productData = await Product.find({});
  res.status(200).json({
    status: 'success',
    data: productData,
  });
});
