import { prisma } from "../../../../generated/prisma-client/index";
import { Context } from "../../../loaders/graphql";
type Args = {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  groupId: string;
  referenceId: string;
};

export default {
  Mutation: {
    addMarker: (_, args: Args, { isAuthenticated }: Context) => {
      isAuthenticated();
      const {
        title,
        description,
        address,
        latitude,
        longitude,
        groupId,
        referenceId
      } = args;

      try {
        return prisma.createMarker({
          title,
          description,
          address,
          latitude,
          longitude,
          group: {
            connect: {
              id: groupId
            }
          },
          reference: {
            connect: {
              id: referenceId
            }
          }
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
