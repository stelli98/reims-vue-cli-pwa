<template>
  <div class="change-password">
    <div class="header change-password__header"></div>
    <div class="change-password__content">
      <div class="heading change-password__heading">Change Password</div>
      <form class="user-form__form">
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Password</label>
          <input
            v-model="user.password"
            type="password"
            name="type"
            class="form__input"
            @blur="$v.user.password.$touch()"
          />
          <div v-if="$v.user.password.$error">
            <p
              v-if="!$v.user.password.required"
              class="input__error-message"
            >Password must be filled</p>
          </div>
          <div v-if="$v.user.password.$error">
            <p
              v-if="!$v.user.password.minLength"
              class="input__error-message"
            >Password must have at least 6 characters</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            name="type"
            class="form__input"
            @blur="$v.user.confirmPassword.$touch()"
          />
          <div v-if="$v.user.confirmPassword.$error">
            <p
              v-if="!$v.user.confirmPassword.required"
              class="input__error-message"
            >Confirm Password must be filled</p>
          </div>
          <div v-if="$v.user.confirmPassword.$error">
            <p
              v-if="!$v.user.confirmPassword.minLength"
              class="input__error-message"
            >Confirm Password must have at least 6 characters</p>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation change-password__navigation">
      <div class="title--navigation" @click="moveTo('user-detail')">Cancel</div>
      <div class="title--navigation" @click="moveTo('user')">Save</div>
    </div>
  </div>
</template>

<script src="./js/change-password-page.js"></script>

<style lang="scss" scoped>
.change-password {
  position: relative;
  height: 100vh;

  &__content {
    width: 65vw;
    margin: 0 auto;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

   &__navigation {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @include respond(large-phone) {
      justify-content: space-evenly;
    }
  }

}
</style>
