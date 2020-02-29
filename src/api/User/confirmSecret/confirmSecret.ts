import moment from "moment";
import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

type Args = {
  email: string;
  secret: string;
};

export default {
  Mutation: {
    confirmSecret: async (_, args: Args) => {
      const { email, secret } = args;
      try {
        const user = await prisma.user({ email });
        if (!user) {
          throw Error("Wrong email address");
        }

        if (!user.loginSecretIssuedAt || !user.loginSecret) {
          throw Error("Secret information is reset");
        }

        if (moment().isAfter(moment(user.loginSecretIssuedAt).add(5, "m"))) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              loginSecret: "",
              loginSecretIssuedAt: null
            }
          });
          throw Error("Scret is expired");
        }

        if (user.loginSecret === secret) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              loginSecret: ""
            }
          });
          return generateToken(user.id);
        } else {
          throw Error("Wrong email/secret combination");
        }
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
