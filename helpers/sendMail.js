const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY_HW06 } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY_HW06);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "veronikanof909@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    console.log("try/catch sgMail");
    throw error;
  }
};

module.exports = sendMail;