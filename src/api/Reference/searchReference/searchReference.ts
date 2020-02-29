import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  term?: string;
};

export default {
  Query: {
    searchReference: (_, args: Args) => {
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
