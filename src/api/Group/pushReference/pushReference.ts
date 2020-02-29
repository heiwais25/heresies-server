import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  groupdId: string;
  referenceIds: [string];
};

export default {
  Mutation: {
    pushReference: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { groupdId, referenceIds } = args;
      try {
        const exist = await prisma.$exists.group({ id: groupdId });
        if (exist) {
          return prisma.updateGroup({
            where: { id: groupdId },
            data: {
              references: {
                connect: referenceIds.map(id => ({ id }))
              }
            }
          });
        } else {
          throw Error("No coressponding group");
        }
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
