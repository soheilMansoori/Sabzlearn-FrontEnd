const testEmail = (value) => {
    // const emailPattern = /^[a-z0-9]+[a-z]+\.[a-z]{2,3}$/g
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailPattern.test(value)
}

export default {
    testEmail,
}