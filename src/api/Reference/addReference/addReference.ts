import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  name: string;
  url: string;
};

export default {
  Mutation: {
    addReference: (_, args: Args) => {
      const { name, url } = args;
      return prisma.createReference({ name, url });
    }
  }
};
