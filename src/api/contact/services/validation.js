"use-strict";

module.exports = {
  isEmailValid: async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  areOtherFieldsValid: async (contactData) => {
    const isValidPhone = contactData.phone
      ? contactData.phone.length >= 10
      : true;
    return isValidPhone;
  },
};
