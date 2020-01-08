const baseUrl =
  process.env.NODE_ENV === "production" ? `http://192.168.43.139:9095` : "";
  // 192.168.43.139
  //http://localhost:9095
module.exports = {
  api: {
    transactions: {
      transaction: `${baseUrl}/api/transactions`,
      medical: `${baseUrl}/api/medicals`
    },
    users: {
      user: `${baseUrl}/api/admin/users`,
      report: `${baseUrl}/api/users/report`,
      personalUser: `${baseUrl}/api/users`,
      family: `${baseUrl}/api/family-members`
    },
    auth: {
      login: `${baseUrl}/api/login`,
      logout: `${baseUrl}/api/logout`
    }
  }
};
