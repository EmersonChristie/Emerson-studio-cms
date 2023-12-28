"use-strict";

module.exports = {
  isEmailValid: async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
