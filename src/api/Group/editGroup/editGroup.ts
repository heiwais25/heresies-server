import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  id: string;
  name?: string;
  description?: string;
  referenceIds?: string[];
};

export default {
  Mutation: {
    editGroup: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { id, name, description, referenceIds = [] } = args;
      try {
        const exist = await prisma.$exists.group({ id });
        if (exist) {
          const references = await prisma.group({ id }).references();
          const oldReference = references.filter(
            ref => !referenceIds.includes(ref.id)
          );
          return prisma.updateGroup({
            where: { id },
            data: {
              name,
              description,
              references: {
                disconnect: oldReference.map(ref => ({ id: ref.id })),
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
