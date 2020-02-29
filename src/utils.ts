import nodemailer, { SendMailOptions } from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import config from "./config";
import { Evaluation } from "./api/CheckList/CheckList";

export const sendMail = async (email: SendMailOptions) => {
  const options = {
    auth: {
      api_user: config.sendgridUsername,
      api_key: config.sendgridPassword
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendReportResponseMail = async (
  address: string,
  responseText: string
) => {
  const email = {
    from: config.adminMail,
    to: address,
    subject: "제보하신 내용에 대한 답변입니다.",
    html: `안녕하십니까. 제보하신 내용에 대한 답변입니다. <br/><br/>
     ${responseText} <br/><br/> 
     도움이 되었기를 바라며 더 필요한 내용이 있으시다면 주저마시고 연락주시기 바랍니다.`
  };

  return sendMail(email);
};

export const isValidCheckListEvaluation = (evaluation: Evaluation) => {
  return (
    evaluation.from > 0 &&
    evaluation.from <= evaluation.to &&
    evaluation.minCheckNum > 0 &&
    evaluation.minCheckNum <= evaluation.to - evaluation.from + 1
  );
};
