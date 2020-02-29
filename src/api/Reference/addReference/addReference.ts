import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  name: string;
  url: string;
};

export default {
  Mutation: {
    addReference: (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { name, url } = args;
      return prisma.createReference({ name, url });
    }
  }
};
