import { AppDataSource } from "../data-source";
import { User } from "../entity";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByUsername(username: string) {
    return this.findOne({ where: { username } });
  },

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },
});
