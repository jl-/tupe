import http from 'http';
import EventEmitter from 'events';

export default class Server extends EventEmitter {
    constructor () {
        super();
        this.server = null;
    }

    async start () {
        const handler = () => console.log('xef');
        this.server = http.createServer(handler);
        this.server.listen(2344, err => {
            console.log('errss: ', err);
        });
    }

    async stop () {

    }
}
