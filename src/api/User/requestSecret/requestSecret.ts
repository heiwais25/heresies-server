import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import { Context } from "graphql-yoga/dist/types";

type Args = {
  email: string;
};

export default {
  Mutation: {
    requestSecret: async (_, args: Args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(email, loginSecret);
      try {
        sendSecretMail(email, loginSecret);
        console.log("here");
        await prisma.updateUser({
          data: { loginSecret, loginSecretIssuedAt: new Date() },
          where: { email }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
