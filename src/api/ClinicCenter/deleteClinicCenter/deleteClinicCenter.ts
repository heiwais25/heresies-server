import { prisma } from "../../../../generated/prisma-client";
import { Context } from "../../../loaders/graphql";

type Args = {
  id: string;
};

export default {
  Mutation: {
    deleteClinicCenter: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
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
