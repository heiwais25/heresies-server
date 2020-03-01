import { prisma } from "../../../generated/prisma-client/index";

export default {
  Group: {
    references: parent => prisma.group({ id: parent.id }).references()
  }
};
