const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Store transaction detaisls

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
  status: {
    type: String,
    default: "ordered", //["ordered"->"dispached/shipped"->"delivered"]
  },
  totalAmount: Number,
});
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
