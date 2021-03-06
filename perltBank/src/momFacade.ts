import amqp from 'amqplib/callback_api'
import settings from './settings'


export interface MomRequest {
    type: string,
    amount: number,
    creditScore: number,
    uid: string,
    responseChannel: string
}

export interface MomResponse {
    uid: string,
    interest: number,
    initialPayment: number,
    bankName: string
}


export function ListenForChannel(exchange: string, callback: (request: MomRequest) => void): void {

    amqp.connect(settings.proxyUrl, (error, connection) => {
        if (error) {
            throw (error);
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw (error);
            }

            channel.assertExchange(exchange, "fanout", { durable: false });
            channel.assertQueue("", { exclusive: true }, (error, q) => {
                if (error) {
                    throw (error);
                }
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                channel.bindQueue(q.queue, exchange, '');
                channel.consume(q.queue, (message) => {
                    if (message) {
                        callback(JSON.parse(message.content.toString()));
                    }
                }, { noAck: true })
            })

        })
    })
}

export function sendOnChannel(exchange: string, response: MomResponse) {
    amqp.connect(settings.proxyUrl, function (error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error, channel) {
            if (error) {
                throw error;
            }


            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });
            channel.publish(exchange, '', Buffer.from(JSON.stringify(response)));
            console.log(" [x] Sent %s", JSON.stringify(response));
        });
    });

}




