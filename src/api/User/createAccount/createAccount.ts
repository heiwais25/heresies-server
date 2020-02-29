import { prisma } from "../../../../generated/prisma-client/index";

type Args = {
  username: string;
  email: string;
};

export default {
  Mutation: {
    createAccount: async (_, args: Args) => {
      const { username, email } = args;
      // TODO : Verify email is valid
      try {
        const exist = await prisma.$exists.user({ email });

        const userCount = await prisma
          .usersConnection()
          .aggregate()
          .count();

        if (exist) {
          throw Error("This email is already taken");
        }

        const isAdmin = userCount === 0;

        const user = await prisma.createUser({
          username,
          email,
          isAdmin
        });
        return user;
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
