import { prisma } from "../../../../generated/prisma-client/index";
export default {
  Query: {
    seeClinicCenter: () => {
      return prisma.clinicCenters({ orderBy: "name_DESC" });
    }
  }
};
