import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteCheckList: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id } = args;
      try {
        await prisma.deleteCheckList({ id });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
