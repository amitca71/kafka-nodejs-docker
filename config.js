
const kafka = {
  clientId: "npm-slack-notifier",
  brokers: [process.env.BOOTSTRAP_BROKER || "localhost:9092"],
  ssl: process.env.KAFKA_SSL ? JSON.parse(process.env.KAFKA_SSL) : false,
  sasl:
    process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD
      ? {
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
          mechanism: 'plain'
        }
      : null,
};

const consumer = {
  groupId: process.env.KAFKA_GROUP_ID || "sample-consumer-group",
};

const app = {
  topic: process.env.TOPIC || "sample-topic"
};

module.exports = {
  kafka,
  consumer,
  app
};
