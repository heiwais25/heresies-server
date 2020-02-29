import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
  name?: string;
  problem?: string;
  referenceId?: string;
  groupId?: string;
};

export default {
  Mutation: {
    editCheckList: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id, name, problem, referenceId, groupId } = args;
      try {
        const exist = await prisma.$exists.checkList({ id });
        if (!exist) {
          throw Error("No corresponding checklist");
        }

        return prisma.updateCheckList({
          where: { id },
          data: {
            name,
            problem,
            reference: {
              connect: {
                id: referenceId
              }
            },
            group: {
              connect: {
                id: groupId
              }
            }
          }
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
