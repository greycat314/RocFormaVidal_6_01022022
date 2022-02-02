const formInputErrors = function(error) {
    console.log("\t");
    if (error) {
        if (error.errors['name']) {
            console.log(error.errors['name'].message);
        }
        if (error.errors['manufacturer']) {
            console.log(error.errors['manufacturer'].message)
        }
        if (error.errors['description']) {
            console.log(error.errors['description'].message	);
        }
        if (error.errors['mainPepper']) {
            console.log(error.errors['mainPepper'].message)
        }
    }
    else {
        console.log('Operation completed successfully. No errors recorded.')
    }
}

module.exports = {
    getErrors: formInputErrors
}
