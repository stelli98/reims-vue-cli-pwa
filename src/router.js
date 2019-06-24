import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import CreateTransaction from "./views/CreateTransaction";
import TransactionDetail from "./views/TransactionDetail";
import ManageUser from "./views/ManageUser";
import UserForm from "./views/UserForm";
import ChangePassword from "./views/ChangePassword";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/home",
      name: "home",
      component: HomePage
    },
    {
      path: "/transaction/create/:step",
      name: "create",
      component: CreateTransaction
    },
    {
      path: "/transaction/:id",
      name: "transaction-detail",
      component: TransactionDetail
    },
    {
      path: "/users",
      name: "user",
      component: ManageUser
    },
    {
      path: "/users/create",
      name: "user-create",
      component: UserForm
    },
    {
      path: "/users/edit/:id",
      name: "user-edit",
      component: UserForm
    },
    {
      path: "/users/change-password",
      name: "change-password",
      component: ChangePassword
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

export default router;
