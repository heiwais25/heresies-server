import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteCheckList: async (_, args: Args) => {
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
