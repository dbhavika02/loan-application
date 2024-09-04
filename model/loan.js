//import mongoose 
const mongoose = require('mongoose')

let loanSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        term: { type: Number, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        dob: { type: String, required: true },
    },
    {
        collection: "loanApp",

    }
);

// Pre-save hook to update the updated_at field before saving
loanSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Pre hook for findOneAndUpdate to update the updated_at field
loanSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updated_at: Date.now() });
    next();
});

//create model and export it 
const loanModel = mongoose.model("loan", loanSchema)
module.exports = loanModel