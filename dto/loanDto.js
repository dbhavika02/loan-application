exports.mapLoanRequestToLoanEntity = (userData) => {
    const { amount, term, firstName, lastName, dob } = userData;
    return {
        amount,
        term,
        first_name: firstName,
        last_name: lastName,
        dob
    }
}

exports.mapLoanEntityToLoanRequest = (databaseData) => {
    const { amount, term, first_name, last_name, dob } = databaseData;

    return {
        amount,
        term,
        firstName: first_name,
        lastName: last_name,
        dob
    }
}

exports.mapLoanEntityToLoanRequestArray = (databaseDataArray) => {
    const finalArray = [];
    databaseDataArray.forEach((el) => {
        finalArray.push(exports.mapLoanEntityToLoanRequest(el?._doc));
    })
    return finalArray;
}