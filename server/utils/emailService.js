console.log("EMAIL SERVICE LOADED");

const sendEmail = async (to, subject, message) => {
  console.log("========== EMAIL NOTIFICATION ==========");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("========================================");
};

module.exports = sendEmail;