/* eslint-disable no-useless-escape */
export const isValidEmail = (email) => {
    const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email checking regex

    return isValid.test(email);
}