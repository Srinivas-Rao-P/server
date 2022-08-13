import otpGenerator from 'otp-generator';
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};
