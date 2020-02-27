import { prisma } from "../../../../generated/prisma-client";

type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteClinicCenter: async (_, args: Args) => {
      const { id } = args;
      try {
        await prisma.deleteClinicCenter({ id });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
