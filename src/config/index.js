
module.exports = {
  api: {
    transactions: {
      transaction: `/api/transactions`,
      medical: `/api/medicals`
    },
    users: {
      user: `/api/users`,
      changePassword: `/api/users/changepassword`,
      family: `/api/family-members`,
      report: `/api/users/report`,
      image: `/api/users/image`
    },
    admin:{
      user: `/api/admin/users`,
      changePassword: `/api/admin/users/changepassword`,
      family: `/api/admin/family-members`,
    },
    auth: {
      login: `/api/login`,
      logout: `/api/logout`
    }
  }
};
