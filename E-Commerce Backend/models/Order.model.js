const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  orders: [
    {
      paymentStatus: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: "ordered", //["ordered"->"dispached/shipped"->"delivered"]
      },
      totalAmount: Number,
      products: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: Number,
          //incase product gets deleted, later we can use name to repr
          name: String,
          price: Number,
        },
      ],
    },
  ],
});
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
