import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteReportType: async (_, args: Args) => {
      const { id } = args;
      try {
        await prisma.deleteReportType({ id });
        return true;
      } catch {
        return false;
      }
    }
  }
};
