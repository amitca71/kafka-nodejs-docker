const { Kafka } = require('kafkajs');
const config = require("./config");

const value = process.argv[2] || 'Hello message !!';
const partition = process.argv[3] || 0;

run();
async function run() {
    try {
        const kafka = new Kafka(config.kafka);
        const producer = kafka.producer();
        console.log('Connecting to Kafka . . .');
        await producer.connect();
        console.log('Connected to Kafka !!');

        const result = await producer.send({
            topic: config.app.topic,
//            messages: [{ value, partition }]
            messages: [{ value}]
        });

        console.log(`Sent Successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch (err) {
        console.error(`ERROR::PRODUCER:: ${err}`);
    }
}