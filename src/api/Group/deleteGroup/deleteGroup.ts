import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteGroup: async (_, args: Args) => {
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
