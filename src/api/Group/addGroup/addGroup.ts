import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  name: string;
  description: string;
  referenceIds: [string];
};

export default {
  Mutation: {
    addGroup: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { name, description, referenceIds } = args;
      try {
        return prisma.createGroup({
          name,
          description,
          references: {
            connect: referenceIds.map(id => ({ id }))
          }
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
