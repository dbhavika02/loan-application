const mongoose = require("mongoose");


mongoose
    .connect("mongodb://127.0.0.1:27017/LoanApplication")
    .then(() => {
        console.log("DB Connected successfully");

    })
    .catch((err) => {
        console.log(err);

    })