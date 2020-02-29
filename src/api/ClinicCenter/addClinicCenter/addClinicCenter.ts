import { prisma } from "../../../../generated/prisma-client";
import { Context } from "../../../loaders/graphql";

type Args = {
  name: string;
  phoneNumber?: string;
  url: string;
};

export default {
  Mutation: {
    addClinicCenter: async (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const { name, phoneNumber, url } = args;
      try {
        const clinicCenter = await prisma.createClinicCenter({
          name,
          phoneNumber,
          url
        });
        return clinicCenter;
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
