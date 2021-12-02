
const { Kafka } = require('kafkajs');
const kafka = {
  clientId: process.env.KAFKA_CLIENT_NAME || "npm-sample-producer",
// AMIT  brokers: [process.env.BOOTSTRAP_BROKER || "localhost:9092", process.env.BOOTSTRAP_BROKER2 || "", process.env.BOOTSTRAP_BROKER3 || ""], verify the best way to do it
  brokers: [process.env.BOOTSTRAP_BROKER || "localhost:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 8
  },
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
  topic: process.env.TOPIC || "sample-topic-17",
  compression: process.env.KAFKA_COMPRESSION || Kafka.None  //other built in option in Kafka.GZIP
};
const producer = {
  allowAutoTopicCreation: process.env.KAFKA_ALLOW_AUTO_TOPIC_CREATION || false
};

module.exports = {
  kafka,
  consumer,
  producer,
  app
};
