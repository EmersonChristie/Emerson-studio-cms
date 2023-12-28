"use strict";

const contact = require("../../contact/controllers/contact");

module.exports = () => ({
  prepareEmailContent: async (artworks, inquiry) => {
    let artworkContent = artworks
      .map(
        (artwork) => `
      <tr>
        <td><img src="${artwork.mainImage.url}" alt="${artwork.title}" style="width:100px;height:auto;"/></td>
        <td>${artwork.title}</td>
        <td>${artwork.dimensions.dimensions}</td>
        <td>${artwork.price.formattedPrice}</td>
      </tr>
    `
      )
      .join("");

    const emailHtml = `
      <html>
      <body>
        <h1>New Inquiry</h1>
        <p>Date: ${new Date(inquiry.inquiryDate).toLocaleDateString(
          "en-US"
        )}</p>
        <p>Inquiry ID: ${inquiry.id}</p>
        ${inquiry.contact.name ? `<p>Name: ${inquiry.contact.name}</p>` : ""}
        ${inquiry.contact.phone ? `<p>Phone: ${inquiry.contact.phone}</p>` : ""}
        <p>Email: ${inquiry.contact.email}</p>
        <p>Message: ${inquiry.message}</p>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Dimensions</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${artworkContent}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const emailParams = {
      to: "em@emersoncontemporary.art",
      from: "inquiry@emersoncontemporary.art",
      replyTo: inquiry.contact.email,
      subject: "New Website Inquiry - Emerson Studio",
      html: emailHtml,
      // Add more details as needed
    };
    return emailParams;
  },
  sendInquiryEmail: async (emailParams) => {
    try {
      await strapi.plugins["email"].services.email.send(emailParams);
      return { message: "Email sent successfully." };
    } catch (err) {
      throw new Error("Failed to send email: " + err.message);
    }
  },
});
