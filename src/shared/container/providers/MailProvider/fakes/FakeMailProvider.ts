import IMailprovider from "../models/IMailProvider";

import IMailProvider from '../models/IMailProvider';

interface IMessage {
    to: string,
    body: string;
}



export default class FakeMailProvider implements IMailprovider {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to, 
            body,
        });
    }
}