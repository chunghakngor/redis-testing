const redis = require("redis");
const client = redis.createClient();

// connect automatically to localhost:6379
// if error, will log the error
client.on("error", (error) => {
  console.error(error);
});

// setting key of username to the value of chung
client.set("username", "chung", redis.print);

// getting the value of the username
client.get("username", redis.print);
