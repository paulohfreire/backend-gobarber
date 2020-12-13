//validando se o usuário de fato existe e excluindo uma imagem antiga caso possua, mantendo apenas a nova.

import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }

    // se existir, deletar avatar anterior

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
      const fileName = await this.storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
      await this.usersRepository.save(user);

      return user;
  }
}

export default UpdateUserAvatarService;
