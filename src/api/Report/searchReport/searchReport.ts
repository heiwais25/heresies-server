import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  typeId: string;
  description: string;
  groupId: string;
  responseMail: string;
  isProcessed: boolean;
  responseText: string;
};

export default {
  Query: {
    searchReport: (_, args: Args) => {
      const {
        typeId,
        description,
        groupId,
        responseMail,
        isProcessed,
        responseText
      } = args;
      return prisma.reports({
        where: {
          OR: [
            {
              type: {
                id: typeId
              }
            },
            {
              group: {
                id: groupId
              }
            },
            {
              description_contains: description
            },
            {
              responseMail_contains: responseMail
            },
            {
              isProcessed: isProcessed
            },
            {
              responseText_contains: responseText
            }
          ]
        }
      });
    }
  }
};
