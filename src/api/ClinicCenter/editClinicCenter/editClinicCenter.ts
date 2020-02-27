import { prisma } from "../../../../generated/prisma-client/index";
type Args = {
  id: string;
  name?: string;
  phoneNumber?: string;
  url?: string;
};

export default {
  Mutation: {
    editClinicCenter: async (_, args: Args) => {
      const { id, name, phoneNumber, url } = args;
      const center = await prisma.$exists.clinicCenter({ id });
      if (center) {
        return prisma.updateClinicCenter({
          where: { id },
          data: { name, phoneNumber, url }
        });
      } else {
        throw Error("There is no corresponding center");
      }
    }
  }
};
