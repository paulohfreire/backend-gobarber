import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailprovider from '@shared/container/providers/MailProvider/models/IMailProvider';



interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private MailProvider: IMailprovider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
      ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exists.');
        }

        await this.userTokensRepository.generate(user.id);

        this.MailProvider.sendMail(email, 'Pedido de recuperação de senha recebido',)
    }


        
}

export default SendForgotPasswordEmailService;