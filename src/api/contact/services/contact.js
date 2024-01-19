"use strict";

/**
 * contact service
 */

const { createCoreService } = require("@strapi/strapi").factories;

// Validation service
const { isEmailValid } = require("./validation");

module.exports = createCoreService("api::contact.contact", ({ strapi }) => ({
  findOrCreate: async (contactData) => {
    try {
      // Validate contact data
      if (!isEmailValid(contactData.email)) {
        throw new Error("Invalid contact data");
      }

      // Attempt to find an existing contact
      let contact = await strapi.entityService.findMany(
        "api::contact.contact",
        {
          filters: { email: contactData.email },
          limit: 1,
        }
      );

      console.log("contact service contact returned from findMany: ", contact);

      contact = contact[0];

      // If contact doesn't exist, create a new one
      if (!contact) {
        console.log("contact service contact doesn't exist, creating new one");
        contact = await strapi.entityService.create("api::contact.contact", {
          data: { ...contactData },
        });
      }

      return contact;
    } catch (error) {
      throw new Error(`Error in findOrCreate: ${error.message}`);
    }
  },
}));
