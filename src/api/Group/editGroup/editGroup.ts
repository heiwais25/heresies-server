import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
  name?: string;
  description?: string;
};

export default {
  Mutation: {
    editGroup: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id, name, description } = args;
      try {
        const exist = await prisma.$exists.group({ id });
        if (exist) {
          return prisma.updateGroup({
            where: { id },
            data: {
              name,
              description
            }
          });
        } else {
          throw Error("No coressponding group");
        }
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
