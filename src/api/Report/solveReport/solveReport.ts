import { prisma } from "../../../../generated/prisma-client/index";
import { sendReportResponseMail } from "../../../utils";

type Args = {
  id: string;
  responseText: string;
};
export default {
  Mutation: {
    solveReport: async (_, args: Args) => {
      const { id, responseText } = args;
      try {
        const report = await prisma.report({ id });
        if (!report) {
          throw Error("No corresponding report");
        }

        // Response mail이 있다면 Send Mail
        if (report.responseMail) {
          sendReportResponseMail(report.responseMail, responseText);
        }

        return prisma.updateReport({
          where: { id },
          data: { responseText, isProcessed: true }
        });
        // 1. If
      } catch (err) {
        console.log(err);
        throw Error(err);
      }
    }
  }
};
