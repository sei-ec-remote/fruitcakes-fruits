/////////////////////////////////////////////////////////
//// Our schema for the comment subdocument          ////
/////////////////////////////////////////////////////////
const mongoose = require('../utils/connection')

// All we need from mongoose, to build subdocuments
// is the schema constructor. 
// SUBDOCUMENTS ARE NOT MONGOOSE MODELS.
// we'll destructure the Schema function from mongoose
const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

// Take note that there is no model function happening anywhere in this file. That's because SUBDOCS ARE NOT MONGOOSE MODELS.

////////////////////////////////////
//// Export our Schema          ////
////////////////////////////////////
module.exports = commentSchema