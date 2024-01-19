"use strict";

/**
 * contact controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => ({
  async newsletterSignup(ctx) {
    try {
      const { email } = ctx.request.body;
      console.log(
        "contact controller newsletterSignup ctx.request.body: ",
        ctx.request.body
      );
      // Check if contact exists or create new one
      let contact = await strapi.services["api::contact.contact"].findOrCreate({
        email,
      });
      console.log("contact controller newsletterSignup contact: ", contact);

      // update contact with newsletter signup
      contact = await strapi.entityService.update(
        "api::contact.contact",
        contact.id,
        {
          data: {
            preferences: { ...contact.preferences, receivesNewsletter: true },
          },
        }
      );

      console.log(
        "contact controller newsletterSignup contact after update: ",
        contact
      );

      return { message: "Newsletter Signup Succeeded" };
    } catch (err) {
      console.log("error in controller: ", err);
      ctx.send({ message: err.message }, 500);
    }
  },
}));
