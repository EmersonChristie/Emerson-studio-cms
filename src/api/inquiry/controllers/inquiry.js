"use strict";

const email = require("../../email/controllers/email");

/**
 * inquiry controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::inquiry.inquiry", ({ strapi }) => ({
  async handleInquiry(ctx) {
    console.log("inquiry controller ctx.request.body: ", ctx.request.body);
    const { contactData, inquiryData } = ctx.request.body;
    try {
      // Check if contact exists or create new one
      let contact = await strapi.services["api::contact.contact"].findOrCreate(
        contactData
      );

      console.log("inquiry controller contact: ", contact);

      // Create new inquiry
      let inquiry = await strapi.entityService.create("api::inquiry.inquiry", {
        data: {
          ...inquiryData,
          inquiryDate: new Date().toISOString(),
          contact: contact.id,
        },
        populate: ["contact"],
      });

      console.log("inquiry controller inquiry create response: ", inquiry);

      // check if i need artwork details or if i can just use the data from the inquiry

      // Fetch artwork details
      let artworksDetails = await strapi.entityService.findMany(
        "api::artwork.artwork",
        {
          filters: { id: { $in: inquiryData.artworks } },
          populate: { mainImage: true, dimensions: true, price: true },
        }
      );

      console.log("inquiry controller artworksDetails: ", artworksDetails);

      // Prepare email content
      let emailContent = await strapi.services[
        "api::email.email"
      ].prepareEmailContent(artworksDetails, inquiry);

      // Send email
      await strapi.services["api::email.email"].sendInquiryEmail(emailContent);

      return { message: "Inquiry processed successfully" };
    } catch (err) {
      console.log("error in controller: ", err);
      ctx.send({ message: err.message }, 500);
    }
  },
}));
