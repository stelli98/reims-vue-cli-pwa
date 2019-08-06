const baseUrl = process.env.NODE_ENV === "production" ? `http://localhost:9095` : ""

module.exports = {
  api: {
    transactions: {
      transaction: `${baseUrl}/api/transactions`
    },
    users: {
      user: `${baseUrl}/api/admin/users`,
      report: `${baseUrl}/api/admin/users/report`
    },
    auth: {
      login: `${baseUrl}/api/login`,
      logout: `${baseUrl}/api/logout`
    }
  }
};
