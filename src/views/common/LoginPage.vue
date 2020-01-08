<template>
  <div class="login">
    <div class="login__container">
      <div class="login__logo">
        <img src="@/assets/images/logo.png" class="logo__big" />
      </div>
      <p class="login__slogan">Make Reimbursement Reporting Become Easier</p>
      <form class="login__form" @submit.prevent="submitLoginForm">
        <div
          class="
        login__input"
        >
          <label for="username" class="title--medium-form">Username</label>
          <input
            v-model="user.username"
            type="text"
            name="username"
            id="login__username"
            autocomplete="off"
            @blur="$v.user.username.$touch()"
          />
          <div v-if="$v.user.username.$error">
            <p v-if="!$v.user.username.required" class="input__error-message">
              Username must be filled
            </p>
          </div>
        </div>
        <div class="login__input">
          <label for="password" class="title--medium-form">Password</label>
          <input
            type="password"
            v-model="user.password"
            name="password"
            id="login__password"
            @blur="$v.user.password.$touch()"
          />

          <div v-if="$v.user.password.$error">
            <p v-if="!$v.user.password.required" class="input__error-message">
              Password must be filled
            </p>
          </div>

          <div v-if="$v.user.password.$error">
            <p v-if="!$v.user.password.minLength" class="input__error-message">
              Password must have at least 6 characters
            </p>
          </div>
        </div>
        <div class="login__button">
          <input type="submit" class="btn-white" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/login-page.js"></script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: $color-green-gradient;
}

.login__slogan {
  font-size: 1.1rem;
  font-family: "Nunito-Regular";
  margin-bottom: 1.2rem;
  letter-spacing: 0.02rem;

  @include respond(small-phone) {
    font-size: 1.3rem;
  }

  @include respond(medium-phone) {
    font-size: 1.35rem;
  }
}

.login__container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 80vw;
  font-size: 1.5rem;
  flex-direction: column;

  @include respond(medium-phone) {
    width: 70vw;
    font-size: 1.75rem;
  }

  @include respond(tab) {
    width: 50vw;
    font-size: 1.8rem;
  }
}

.login__form {
  width: 100%;
}

.login__form > div {
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
}

.logo__small {
  height: 2rem;

  @include respond(large-phone) {
    height: 3rem;
  }
}

.logo__big {
  height: 6.5rem;
}

#login__username,
#login__password {
  border: none;
  background: transparent;
  border-bottom: #fff solid 0.1rem;
  color: #fff;
  width: 100%;
  font-size: 105%;
}

#login__username:focus,
#login__password:focus {
  outline: none;
}

.login__button {
  display: flex;
  justify-content: center;

  & input {
    font-size: 1.5rem;
    padding: 1rem 3rem;
  }
}
</style>
