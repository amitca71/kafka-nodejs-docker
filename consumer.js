const { Kafka } = require('kafkajs');
const config = require("./config");

run();
async function run() {
    try {
        const kafka = new Kafka(config.kafka);

        const consumer = kafka.consumer({ groupId: config.consumer.groupId });
        console.log('Connecting to Kafka . . .');
        await consumer.connect();
        console.log('Connected to Kafka !!');

        await consumer.subscribe({
            topic: config.app.topic,
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(`Message ${result.message.value} on partition ${result.partition}`);
            }
        });
    }
    catch (err) {
        console.error(`ERROR::CONSUMER:: ${err}`);
    }
}
