import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteGroup: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id } = args;
      try {
        await prisma.deleteGroup({ id });
        return true;
      } catch {
        return false;
      }
    }
  }
};
