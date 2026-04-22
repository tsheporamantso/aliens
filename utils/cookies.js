const cookies = (response, token) => {
  const oneDay = 1000 * 60 * 60 * 24;

  return response.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = cookies;
