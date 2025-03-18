const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  contacts: [
    {
      contactUser: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      name: { type: String, required: true },
      phone_number:{
        type:String,
        required:true,
        unique:true
      },
      profile_pic: {
        type:String,
        default:"default.jpg"
      },
      lastSeen:{
        type:Date,
        default:Date.now()
      }

    },
  ],
});


const Contacts = mongoose.model("contacts",contactsSchema);
module.exports = Contacts;