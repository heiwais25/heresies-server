import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
  name?: string;
  url?: string;
};

export default {
  Mutation: {
    editReference: async (_, args: Args) => {
      const { id, name, url } = args;
      try {
        const ref = await prisma.$exists.reference({ id });
        if (ref) {
          return prisma.updateReference({ where: { id }, data: { name, url } });
        } else {
          throw Error("No corresponding reference");
        }
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
