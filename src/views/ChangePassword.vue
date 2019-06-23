<template>
  <div class="change-password">
    <div class="change-password__header">
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
      <div class="change-password__heading">
        Change Password
      </div>
      <form class="change-password__form">
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

<script>
import { minLength, sameAs, required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        confirmPassword: "",
        password: ""
      })
    }
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    moveTo() {
      this.$router.go(-1);
    },
    getUserDetail() {
      this.$route.params.id
        ? Object.assign(this.user, this.getUser(this.$route.params.id))
        : "";
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        console.log(this.user);
        this.changePassword(this.user);
        // this.$router.push({ name: 'user' });
      } else {
        console.log("error");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.change-password {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-green-gradient;
    height: 5rem;
    padding: 0 1.5rem;
  }

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

  &__heading {
    display: flex;
    font-size: 1.5rem;
    font-family: "Nunito-Bold";
    margin-bottom: 1rem;

    @include respond(tab) {
      font-size: 1.8rem;
    }
  }
}
.form {
  &__child {
    margin-bottom: 1.5rem;
  }

  &__input {
    border: none;
    background: transparent;
    border-bottom: $color-black solid 0.1rem;
    color: $color-black;
    width: 100%;

    @include respond(large-phone) {
      font-size: 1.2rem;
    }

    &__select {
      padding: 0.5rem;

      &:focus {
        outline: none;
      }
    }
  }

  &__currency {
    display: flex;
    align-items: center;
    background: transparent;
    border-bottom: $color-black solid 0.1rem;
    color: $color-black;
    font-size: 1.2rem;
    width: 100%;

    &__symbol {
      padding: 0.5rem;
    }

    &__input {
      width: 100%;
      padding: 0.5rem 0;
      font-size: 1.2rem;

      &:disabled {
        background-color: transparent;
      }
    }
  }
}

.input {
  &__label {
    display: block;
  }
  &__error-message {
    color: $color-red;
    font-weight: bold;
    padding: 0.5rem;
  }
}
</style>
