import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  value: string;
};

export default {
  Mutation: {
    addReportType: (_, args: Args) => {
      const { value } = args;
      return prisma.createReportType({ value });
    }
  }
};
