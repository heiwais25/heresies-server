declare module "nodemailer-sendgrid-transport" {
  import SMTPTransport = require("nodemailer/lib/smtp-transport");
  interface options {
    auth: {
      api_user: string;
      api_key: string;
    };
  }

  function sgTransport(options: options): SMTPTransport.Options;
  export default sgTransport;
}
