<template>
  <div class="user-form">
    <div class="user-form__header">
      <div class="user-form__close" @click="moveTo">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div class="title--menu user-form__next" @click="submitForm">
        SAVE
      </div>
    </div>
    <div class="user-form__content">
      <div class="user-form__heading">
        Edit User
      </div>
      <form class="user-form__form">
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
            <p v-if="!$v.user.role.required" class="input__error-message">
              Role must be filled
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { minLength, required } from "vuelidate/lib/validators";

const user = {
  username: "",
  password: "",
  role: ""
};

export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      role: { required }
    }
  },
  data() {
    return {
      roles: ["ADMIN", "MEMBER"]
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    userId() {
      return this.$route.params.id | "";
    }
  },
  methods: {
    ...mapActions("user", ["updateUser", "createUser", "getUser", "emptyUser"]),
    moveTo() {
      this.$router.go(-1);
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.sendForm();
        this.$router.push({ name: "user" });
      } else {
        console.log("error");
      }
    },
    checkActionForm() {
      this.userId ? this.getUser(this.userId) : this.emptyUser(user);
    },
    sendForm() {
      this.userId ? this.updateUser(this.user) : this.createUser(this.user);
    }
  },
  mounted() {
    this.checkActionForm();
  }
};
</script>

<style lang="scss">
.user-form {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-green-gradient;
    height: 5rem;
    padding: 0 1.5rem;
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
