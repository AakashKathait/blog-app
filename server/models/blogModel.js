const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"],
    },
    content: {
      type: String,
      required: [true, "Blog content required"],
    },
    author: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        comment: {
          type: String,
          required: [true, "Please fill the input"],
        },
        blogID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Blog",
        },
        user: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User not logged in"],
            ref: "User",
          },
          name: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
