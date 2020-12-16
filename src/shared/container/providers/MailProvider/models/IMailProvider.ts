export default interface IMailprovider {
    sendMail(to: string, body: string): Promise<void>;
}

