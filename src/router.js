import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import CreateTransaction from "./views/CreateTransaction";
import TransactionDetail from "./views/TransactionDetail";
import ManageUser from "./views/ManageUser";
import UserForm from "./views/UserForm";
import EditProfile from "./views/EditProfile";
import CropImage from "./components/CropImage";
import FilterImage from "./components/FilterImage";
import TransactionForm from "./components/TransactionForm";
import CreateMedicalTransaction from "./views/CreateMedicalTransaction";
import store from "./store";

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
      // beforeEnter: checkAuthUser,
      name: "home",
      component: HomePage
    },
    {
      path: "/transaction/create/",
      // beforeEnter: checkAuthUser,
      component: CreateTransaction, 
      children: [
        {
          path: '1',
          name:"create-transaction-1",
          component: CropImage
        },
        {
          path: '2',
          name:"create-transaction-2",
          component: FilterImage
        },
        {
          path: '3',
          name:"create-transaction-3",
          component: TransactionForm
        }
      ]
    },
    {
      path: "/transaction/:id",
      beforeEnter: checkAuthUser,
      name: "transaction-detail",
      component: TransactionDetail
    },
    {
      path: "/users",
      beforeEnter: checkAuthAdmin,
      name: "user",
      component: ManageUser
    },
    {
      path: "/users/create",
      beforeEnter: checkAuthAdmin,
      name: "user-create",
      component: UserForm
    },
    {
      path: "/users/edit/:id",
      beforeEnter: checkAuthAdmin,
      name: "user-edit",
      component: UserForm
    },
    {
      path: "/users/edit-profile",
      beforeEnter: checkAuthUser,
      name: "edit-profile",
      component: EditProfile
    },
    {
      path: "/transaction/non-ocr/medical",
      // beforeEnter: checkAuthUser,
      name: "create-medical",
      component: CreateMedicalTransaction
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

function checkAuthUser(to, from, next) {
  // if (!!store.state.auth.token && store.state.auth.role === "USER") {
  //   next();
  // } else {
  //   const notification = {
  //     type: "error",
  //     message: "You are not authorized. Please login again."
  //   };
  //   store.dispatch("notification/addNotification", notification);
  // next("/login");
  // }
}

function checkAuthAdmin(to, from, next) {
  // if (!!store.state.auth.token && store.state.auth.role === "ADMIN") {
  //   next();
  // } else {
  //   const notification = {
  //     type: "error",
  //     message: "You are not authorized. Please login again."
  //   };
  //   store.dispatch("notification/addNotification", notification);
  // next("/login");
  // }
}
export default router;
