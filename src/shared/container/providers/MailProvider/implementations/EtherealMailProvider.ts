import nodemailer, { Transporter } from 'nodemailer';
import IMailprovider from "../models/IMailProvider";


export default class EtherealMailProvider implements IMailprovider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
                },
        });

        this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
        this.client.sendMail({
            from: 'Equipe GoBarber <equipe@gobarber.com.br',
            to,
            subject: 'Recuperação de senha',
            text: body,
        })
        
    }
}