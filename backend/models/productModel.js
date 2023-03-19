import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: String,
  slug: String,
  index: Number,
  proType: [
    // product type
    {
      title: String,
      products: [
        {
          name: String,
          price: String,
          img: String,
          topping: [
            {
              name: String,
              toppingPrice: String,
            },
          ],
        },
      ],
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;

// Ex:
// {
//     category: "Cà Phê",
//     slug: "coffee",
//     type: [
//       {
//         title: "Cà Phê Việt",
//         products: [
//           {
//             name: "Cà Phê Hạt Dẻ",
//             price: "52.000đ",
//             img: "",
//             topping: [
//               {
//                 name: "",
//                 toppingPrice: "",
//               },
//             ],
//           },
//         ]
//     }
//     ]
// }
