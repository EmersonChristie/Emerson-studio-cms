"use strict";
module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/inquiries/website-inquiry",
      handler: "inquiry.handleInquiry",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
