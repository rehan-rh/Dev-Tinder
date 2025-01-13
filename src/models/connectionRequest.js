const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps:true,
  }
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});// compound indexing(combined indexing)

connectionRequestSchema.pre("save", function (next){// this function will called before saved
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send request to yourself");
    }
    next();

})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);