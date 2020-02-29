import { prisma } from "../../../../generated/prisma-client/index";
import { Evaluation } from "../CheckList";
import { isValidCheckListEvaluation } from "../../../utils";

type Args = {
  name: string;
  problem: string;
  groupId: string;
  referenceId: string;
  evaluations: [Evaluation];
};

const isValidEvaluation = (evaluations: [Evaluation]) => {
  return evaluations.every(isValidCheckListEvaluation);
};

export default {
  Mutation: {
    addCheckList: async (_, args: Args) => {
      const { name, problem, groupId, referenceId, evaluations } = args;

      try {
        // Validation
        if (!isValidEvaluation(evaluations)) {
          throw Error("Evaluation is not valid");
        }

        const checkList = await prisma.createCheckList({
          name,
          problem,
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

        evaluations.forEach(async evaluation => {
          await prisma.createCheckListEvaluation({
            ...evaluation,
            checkList: {
              connect: {
                id: checkList.id
              }
            }
          });
        });

        return checkList;
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
