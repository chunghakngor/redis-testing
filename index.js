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

// set userID to a random ID and expire aafter 2 seconds
client.set("userID", "randomuserID");
client.expire("userID", 2);

// publish/subscribe model
const publisher = redis.createClient();
let total_users = 0;

client.on("subscribe", (channel, count) => {
  publisher.publish("current_users", "chung");
  publisher.publish("current_users", "john");
  publisher.publish("current_users", "bob");
});

client.on("message", (channel, msg) => {
  total_users++;
  // will console.log the channel name and message recieved
  // can manually publish message using another client too
  // eg. docker exec -it redis-testing redis-cli
  //     publish current_users <user>
  console.log(`${channel}:: ${msg} has been added!`);
  if (total_users >= 3) {
    console.log("Total current users has exceded 3!");
    client.unsubscribe();
    client.quit();
    publisher.quit();
  }
});

client.subscribe("current_users");
