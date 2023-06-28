//if user register is success
//if user hvae success to match email and password then sendThe token

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

// I send a token from this sendToken to the body.response
//Now i can receive { token } from fronted by using axios.post in login phase
//Because the token is set in the cookie of postman not on the chrome => application => cookies
