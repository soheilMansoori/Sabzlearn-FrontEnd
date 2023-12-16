import allRegexes from './Regexes'
const Validator = (inputValue, rules) => {
    // console.log(inputValue, rules);
    // console.log(allRegexes);
    let validationResults = []
    rules.forEach(rule => {
        if (rule.value === "REQUIRED_VALUE") {
            inputValue.trim().length === 0 && validationResults.push(false)
        }

        if (rule.value === 'MIN_VALUE') {
            inputValue.trim().length < rule.min && validationResults.push(false)
        }

        if (rule.value === 'MAX_VALUE') {
            inputValue.trim().length > rule.max && validationResults.push(false)
        }

        if(rule.value === 'EMAIL_VALUE') {
            // console.log(allRegexes.testEmail(inputValue));
            !allRegexes.testEmail(inputValue) && validationResults.push(false) 
        }
    });

    // console.log(validationResults);

    if (validationResults.length) {
        return false
    } else {
        return true
    }
}

export default Validator