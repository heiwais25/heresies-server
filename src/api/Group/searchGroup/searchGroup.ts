import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  term?: string;
};

export default {
  Query: {
    searchGroup: (_, args: Args) => {
      const { term = "" } = args;
      return prisma.groups({
        where: { OR: [{ name_contains: term }, { description_contains: term }] }
      });
    }
  }
};
