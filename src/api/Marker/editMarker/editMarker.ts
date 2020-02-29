import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
  title?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  groupId?: string;
  referenceId?: string;
};

export default {
  Mutation: {
    editMarker: async (_, args: Args) => {
      const {
        id,
        title,
        description,
        address,
        latitude,
        longitude,
        groupId,
        referenceId
      } = args;

      try {
        const exist = await prisma.$exists.marker({ id });
        if (!exist) {
          throw Error("No corresponding marker");
        }

        return await prisma.updateMarker({
          where: {
            id
          },
          data: {
            title,
            description,
            address,
            latitude,
            longitude,
            group: groupId
              ? {
                  connect: {
                    id: groupId
                  }
                }
              : undefined,
            reference: referenceId
              ? {
                  connect: {
                    id: referenceId
                  }
                }
              : undefined
          }
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
