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
      family: `${baseUrl}/api/family-members`,
      report: `${baseUrl}/api/users/report`,
      user: `${baseUrl}/api/users`
    },
    admin:{
      user: `${baseUrl}/api/admin/users`,
      family: `${baseUrl}/api/admin/family-members`,
    },
    auth: {
      login: `${baseUrl}/api/login`,
      logout: `${baseUrl}/api/logout`
    }
  }
};
