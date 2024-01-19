"use strict";
module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/newsletter-signup",
      handler: "contact.newsletterSignup",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
