<template>
  <div class="edit-profile">
    <div class="header edit-profile__header">
      <div class="edit-profile__close" @click="moveTo">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div class="title--menu user-form__next" @click="submitForm">
        SAVE
      </div>
    </div>
    <div class="edit-profile__content">
      <div class="heading edit-profile__heading">
        Change Password
      </div>
      <form class="edit-profile__form">
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
            v-model="confirmPassword"
            type="password"
            name="type"
            class="form__input"
            @blur="$v.confirmPassword.$touch()"
          />
          <div v-if="$v.confirmPassword.$error">
            <p v-if="!$v.confirmPassword.required" class="input__error-message">
              Confirm Password must be filled
            </p>
          </div>
          <p v-if="sameAsPassword" class="input__error-message">
            Confirm Password must same as Password
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/edit-profile.js"></script>

<style lang="scss">
.edit-profile {
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
