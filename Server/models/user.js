const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, minlength: 5 },
    lastname: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, minlength: 5 },
    passwordHash: { type: String, minlength: 3, required: true },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
