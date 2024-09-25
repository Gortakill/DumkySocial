import io, { Socket } from 'socket.io-client';

export class SocketApi {
    static socket: null | Socket = null;

    static createConnection() {
        if (!this.socket) {
            this.socket = io(
                'https://dumky-social-server-production.up.railway.app/',
            );

            this.socket.on('connect', () => {
                console.log('succes connection');
            });

            this.socket.on('disconnect', () => {
                console.log('socket disconnected');
                this.socket = null;
            });
            this.socket.on('client-path', (message) => {
                console.log('Received message:', message);
            });
        }
        if (this.socket) {
            return;
        }
    }
}
