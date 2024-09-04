const { application } = require('express');
const { mapLoanRequestToLoanEntity, mapLoanEntityToLoanRequest, mapLoanEntityToLoanRequestArray } = require('../dto/loanDto');
const loanModel = require('../model/loan')

exports.addApplication = async (req, res) => {
    try {
        const { amount, term, firstName, lastName, dob } = req.body;

        // validation - validate - accuracy - security
        if (!amount || !term || !firstName || !lastName || !dob) {
            return res.status(400).json({
                error: "Please include all fields"
            })
        }


        const databaseData = mapLoanRequestToLoanEntity(req.body);
        const newLoan = new loanModel(databaseData);
        const saveLoan = await newLoan.save()


        const userData = mapLoanEntityToLoanRequest(saveLoan?._doc);
        // response to frontnend
        return res.status(200).json({
            message: "Loan application created successfully",
            loans: {
                id: saveLoan?._id,
                status: "Created",
                ...userData
            }
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
}

exports.allApplication = async (req, res) => {
    try {
        // first_name
        const applications = await loanModel.find({})
        const userData = mapLoanEntityToLoanRequestArray(applications);
        // firstName

        return res.status(200).json({ userData })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getLoanApplicationByID = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await loanModel.findOne({
            _id: id
        })

        if (!application) {
            return res.status(404).json({
                error: "applicaition not found",

            })
        }
        const userData = mapLoanEntityToLoanRequest(application);
        return res.status(200).json({
            application: userData
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

exports.updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const mappedUpdateData = mapLoanRequestToLoanEntity(updateData);
        const application = await loanModel.findOneAndUpdate(
            { _id: id },
            { $set: mappedUpdateData }, // Update with the fields provided in the request body
            { new: true } // Return the updated document
        );

        if (!application) {
            return res.status(404).json({
                error: 'Application not found'
            });
        }
        const userData = mapLoanEntityToLoanRequest(application?._doc);
        return res.status(200).json({
            application: userData
        });

    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }
}

exports.partialUpdateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Ensure updateData is not empty
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                error: 'No fields provided to update'
            });
        }

        const mappedUpdateData = mapLoanRequestToLoanEntity(updateData);
        const application = await loanModel.findOneAndUpdate(
            { _id: id },
            { $set: mappedUpdateData }, // Update only the provided fields
            { new: true } // Return the updated document
        );

        if (!application) {
            return res.status(404).json({
                error: 'Application not found'
            });
        }

        const userData = mapLoanEntityToLoanRequest(application?._doc);
        return res.status(200).json({
            application: userData
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params
        const deleteApplication = await loanModel.deleteOne({ _id: id })
        if (deleteApplication) {
            return res.status(200).json({
                message: "Application deleted successfully"
            })
        } else {
            return res.status(404).json({
                error: "User not found"
            })
        }
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}