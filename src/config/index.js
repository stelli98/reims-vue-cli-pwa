const baseUrl =
  process.env.NODE_ENV === "production" ? `http://localhost:9095` : "";
module.exports = {
  api: {
    transactions: {
      transaction: `${baseUrl}/api/transactions`,
      medical: `${baseUrl}/api/medicals`
    },
    users: {
      user: `${baseUrl}/api/users`,
      changePassword: `${baseUrl}/api/users/changepassword`,
      family: `${baseUrl}/api/family-members`,
      report: `${baseUrl}/api/users/report`,
      image: `${baseUrl}/api/users/image`
    },
    admin:{
      user: `${baseUrl}/api/admin/users`,
      changePassword: `${baseUrl}/api/admin/users/changepassword`,
      family: `${baseUrl}/api/admin/family-members`,
    },
    auth: {
      login: `${baseUrl}/api/login`,
      logout: `${baseUrl}/api/logout`
    }
  }
};
