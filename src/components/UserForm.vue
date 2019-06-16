<template>
  <form class="create-user__form">
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
      >
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
      >
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
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';

export default {
    validations: {
        user: {
            username: { required },
            password: { required, minLength: minLength(6) },
            role: { required }
        }
    },
    props: {
        user: {
            type: Object,
            default: () => ({
                username: '',
                password: '',
                role: ''
            })
        },
    },
    data () {
        return {
            roles: [
                'ADMIN',
                'MEMBER'
            ],
        };
    },
    methods: {
        moveTo () {
            this.$router.go(-1);
        },
        getUserDetail () {
            this.$route.params.id ?
                Object.assign(this.user, this.getUser(this.$route.params.id)) : '';
        },
        submitForm () {
            this.$v.user.$touch();
            if (!this.$v.user.$invalid) {
                console.log(this.user);
                // this.createUser(this.user);
                // this.$router.push({ name: 'user' });
            } else {
                console.log('error');
            }
        }
    }
};
</script>

<style lang="scss" >
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