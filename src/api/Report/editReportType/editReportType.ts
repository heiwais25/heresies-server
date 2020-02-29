import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
  value: string;
};

export default {
  Mutation: {
    editReportType: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id, value } = args;
      try {
        const exist = await prisma.$exists.reportType({ id });
        if (exist) {
          return prisma.updateReportType({
            where: { id },
            data: {
              value
            }
          });
        } else {
          throw Error("No corresponding report type");
        }
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
