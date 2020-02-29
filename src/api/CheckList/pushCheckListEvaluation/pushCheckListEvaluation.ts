import { prisma } from "../../../../generated/prisma-client/index";
import { Evaluation } from "../CheckList";
import { isValidCheckListEvaluation } from "../../../utils";
import { Context } from "../../../loaders/graphql";
type Args = {
  checkListId: string;
  evaluation: Evaluation;
};

export default {
  Mutation: {
    pushCheckListEvaluation: async (
      _,
      args: Args,
      { isAuthenticated }: Context
    ) => {
      isAuthenticated();
      const { checkListId, evaluation } = args;
      try {
        if (!isValidCheckListEvaluation(evaluation)) {
          throw Error("It is not valid evaluation");
        }

        const exist = await prisma.$exists.checkList({ id: checkListId });
        if (!exist) {
          throw Error("No corresponding checklist");
        }

        return prisma.createCheckListEvaluation({
          checkList: {
            connect: {
              id: checkListId
            }
          },
          ...evaluation
        });
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
