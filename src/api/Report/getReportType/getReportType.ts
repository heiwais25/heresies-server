import { prisma } from "../../../../generated/prisma-client/index";
export default {
  Query: {
    getReportType: () => {
      return prisma.reportTypes();
    }
  }
};
