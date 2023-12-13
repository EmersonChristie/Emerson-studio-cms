const { URL } = require("url");

// Parse the connection string
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log("DATABASE_URL not set");
  throw new Error("DATABASE_URL not set");
}
const parsedUrl = new URL(databaseUrl);
console.log(parsedUrl);

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      database: parsedUrl.pathname.substring(1), // Removes the leading '/'
      user: parsedUrl.username,
      password: parsedUrl.password,
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
  debug: false,
});
