const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
});

RefreshTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

const RefreshToken = mongoose.model("refreshToken", RefreshTokenSchema);
module.exports = RefreshToken;
