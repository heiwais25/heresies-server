import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  term?: string;
};

export default {
  Query: {
    searchReference: (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { term = "" } = args;
      return prisma.references({
        where: {
          OR: [
            {
              name_contains: term
            }
          ]
        }
      });
    }
  }
};
