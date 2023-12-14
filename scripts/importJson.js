const fs = require("fs");
const axios = require("axios");

// Replace with your Strapi API URL and Content-Type
const STRAPI_API_URL = "http://127.0.0.1:1337/api";
const CONTENT_TYPE = "artworks"; // Example content type

// Function to import data
async function importData() {
  // Read JSON file
  const data = JSON.parse(
    fs.readFileSync("./scripts/data/artworks.json", "utf8")
  );

  // Loop through each item in the JSON and post it to Strapi
  for (const item of data) {
    try {
      // Convert year to string
      const updatedItem = {
        ...item,
        year: item.year.toString(),
      };

      const response = await axios.post(
        `${STRAPI_API_URL}/${CONTENT_TYPE}`,
        { data: updatedItem },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Imported:", response.data);
    } catch (error) {
      console.error("Error importing:", JSON.stringify(error.response.data));
    }
  }
}

// Run the import function
importData();
