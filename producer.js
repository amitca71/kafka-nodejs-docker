const { Kafka } = require('kafkajs');
const config = require("./config");

const value = process.argv[2] || 'Hello message !!';

run();
async function run() {
    try {
        const kafka = new Kafka(config.kafka);
        console.log('bfore  . . .');
        const producer = kafka.producer(config.producer);
        console.log('Connecting to Kafka . . .');
        await producer.connect();
        console.log('Connected to Kafka !!');

        const result = await producer.send({
            topic: config.app.topic,
            messages: [{ value}],
            compression: config.app.compression
        });

        console.log(`Sent Successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch (err) {
        console.error(`ERROR::PRODUCER:: ${err}`);
//Amit need to  producer.disconnect(); so it would not be hanged- how?       
    }
}