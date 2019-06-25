<template>
  <div class="user-form">
    <div class="header user-form__header">
      <div
        class="user-form__close"
        @click="moveTo"
      >
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div
        class="title--menu user-form__next"
        @click="submitForm"
      >
        SAVE
      </div>
    </div>
    <div class="user-form__content">
      <div class="heading user-form__heading">
        Edit User
      </div>
      <form class="user-form__form">
        <div class="form__child">
          <label
            class="input__label title--medium-form"
            for="type"
          >
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
            <p
              v-if="!$v.user.username.required"
              class="input__error-message"
            >
              Name must be filled
            </p>
          </div>
        </div>
        <div class="form__child">
          <label
            class="input__label title--medium-form"
            for="type"
          >
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
            <p
              v-if="!$v.user.password.required"
              class="input__error-message"
            >
              Password must be filled
            </p>
          </div>
          <div v-if="$v.user.password.$error">
            <p
              v-if="!$v.user.password.minLength"
              class="input__error-message"
            >
              Password must have at least 6 characters
            </p>
          </div>
        </div>
        <div class="form__child">
          <label
            class="input__label title--medium-form"
            for="type"
          >
            Role
          </label>
          <select
            v-model="user.role"
            class="form__input form__input__select"
            @blur="$v.user.role.$touch()"
          >
            <option
              v-for="role in roles"
              :key="role"
              :value="role"
              :selected="user.role"
            >
              {{ role | textFormatter }}
            </option>
          </select>
          <div v-if="$v.user.role.$error">
            <p
              v-if="!$v.user.role.required"
              class="input__error-message"
            >
              Role must be filled
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/user-form.js"></script>

<style lang="scss">
.user-form {
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
