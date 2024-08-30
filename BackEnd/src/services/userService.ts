import valMessage from "../constants/validationMessages";

import { UserServiceError, ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { User } from "../entity";
import { UserRepository } from "../repository";
import { isNotUserAdmin } from "../helpers/validations";

export class UserService {
  constructor() {}

  async logIn(username: string, password: string) {
    const existingUser = await UserRepository.findOneBy({
      username: username,
    });

    if (!existingUser) {
      throw new UserServiceError(
        valMessage.VALUE_NOT_EXIST("Nombre de Usuario"),
        username
      );
    }

    if (!existingUser.compareHashPass(password)) {
      throw new UserServiceError(
        valMessage.VALUE_INCORRECT("Contraseña"),
        password
      );
    }

    return existingUser;
  }

  async create(user: User) {
    const username = await UserRepository.findByUsername(user.username);
    if (username) {
      throw new UserServiceError(
        codeErrors.GEN_3("Nombre de Usuario"),
        user.username
      );
    }

    const email = await UserRepository.findByEmail(user.email);
    if (email) {
      throw new UserServiceError(codeErrors.GEN_3("Email"), user.username);
    }

    return UserRepository.save(user);
  }

  async update(user: User) {
    const existingUser = await UserRepository.findOneBy({ id: user.id });

    if (!existingUser) {
      throw new ServiceCodeError(codeErrors.GEN_2("usuario"));
    }

    await UserRepository.update({ id: existingUser.id }, user);

    return this.findById(existingUser.id);
  }

  async delete(user: User) {
    isNotUserAdmin(user);
    user.isDeleted = true;
    return UserRepository.save(user);
  }

  async findById(userId: string) {
    const existingUser = await UserRepository.findOneBy({
      id: userId,
    });

    if (!existingUser) {
      throw new UserServiceError(codeErrors.GEN_1("User"), userId);
    }
    return existingUser;
  }
}
