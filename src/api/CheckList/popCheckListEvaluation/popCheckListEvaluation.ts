import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
};

export default {
  Mutation: {
    popCheckListEvaluation: async (_, args: Args) => {
      const { id } = args;
      try {
        await prisma.deleteCheckListEvaluation({ id });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
