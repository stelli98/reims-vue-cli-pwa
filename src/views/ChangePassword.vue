<template>
  <div class="change-password">
    <div class="header change-password__header">
      <div class="change-password__close" @click="moveTo">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div class="title--menu user-form__next" @click="submitForm">
        SAVE
      </div>
    </div>
    <div class="change-password__content">
      <div class="heading change-password__heading">
        Change Password
      </div>
      <form class="change-password__form">
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">
            Username
          </label>
          <input
            v-model="user.username"
            type="text"
            name="type"
            class="form__input"
            @blur="$v.user.username.$touch()"
          />
          <div v-if="$v.user.username.$error">
            <p v-if="!$v.user.username.required" class="input__error-message">
              Name must be filled
            </p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">
            Password
          </label>
          <input
            v-model="user.password"
            type="password"
            name="type"
            class="form__input"
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
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">
            Confirm Password
          </label>
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
            >
              Confirm Password must be filled
            </p>
          </div>
          <div v-if="$v.user.confirmPassword.$error">
            <p
              v-if="!$v.user.confirmPassword.sameAsPassword"
              class="input__error-message"
            >
              Confirm Password must same as Password
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/change-password.js"></script>

<style lang="scss">
.change-password {
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
}
</style>
