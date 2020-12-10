import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
    private vision: ClientProxy;
    private VISION_TCP_PORT: number = 3005;

    constructor() {
        this.vision = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                port: this.VISION_TCP_PORT as any,
            },
        });
    }

    login(login: string, pass: string): Promise<string> {
        const pattern: any = { cmd: 'login' };
        const payload: any = { login, pass };
        return this.vision.send<string>(pattern, payload).toPromise();
    }
}
