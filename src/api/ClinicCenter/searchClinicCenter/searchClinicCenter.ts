import { prisma } from "../../../../generated/prisma-client/index";
export default {
  Query: {
    searchClinicCenter: () => {
      return prisma.clinicCenters({ orderBy: "name_DESC" });
    }
  }
};
