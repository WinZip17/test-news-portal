module.exports = {
  transport: `${process.env.MAIL_MAILER}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
};
