import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  typeId: string;
  description: string;
  responseMail?: string;
  markerId: string;
  groupId: string;
};

export default {
  Mutation: {
    addReport: (_, args: Args) => {
      const { typeId, description, responseMail, markerId, groupId } = args;
      try {
        return prisma.createReport({
          type: {
            connect: { id: typeId }
          },
          description,
          responseMail,
          marker: markerId
            ? {
                connect: { id: markerId }
              }
            : undefined,
          group: groupId
            ? {
                connect: { id: groupId }
              }
            : undefined
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
