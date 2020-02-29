import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  value: string;
};

export default {
  Mutation: {
    addReportType: (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { value } = args;
      return prisma.createReportType({ value });
    }
  }
};
