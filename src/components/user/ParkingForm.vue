<template>
  <form class="transaction-form__parking">
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Title
      </label>
      <input autocomplete="off"
        v-model="parking.title"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.parking.title.$touch()"
      />
      <div v-if="$v.parking.title.$error">
        <p v-if="!$v.parking.title.required" class="input__error-message">
          Title must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="date">
        Date
      </label>
      <Datetime
        v-model="formatDate"
        type="date"
        class="form__input"
        :max-datetime="currentDateTime"
        @close="$v.parking.date.$touch()"
      />
      <div v-if="$v.parking.date.$error">
        <p v-if="!$v.parking.date.required" class="input__error-message">
          Date must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Location
      </label>
      <input autocomplete="off"
        v-model="parking.location"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.parking.location.$touch()"
      />
      <div v-if="$v.parking.location.$error">
        <p v-if="!$v.parking.location.required" class="input__error-message">
          Location must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Amount
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input autocomplete="off"
          v-model="parkingAmount"
          type="text"
          name="type"
          class="form__currency__input"
        />
      </div>

      <div v-if="$v.parking.amount.$error">
        <p v-if="!$v.parking.amount.required" class="input__error-message">
          Amount must be filled
        </p>
      </div>
      <p
        v-if="!$v.parking.amount.currency && $v.parking.amount.required"
        class="input__error-message"
      >
        Amount must be only filled in IDR currency format
      </p>
      <p
        v-if="!$v.amountInt.minValue && $v.parking.amount.currency"
        class="input__error-message"
      >
        Amount must more than 100
      </p>
    </div>
  </form>
</template>

<script src="./js/parking-form.js"></script>

<style lang="scss">
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
</style>
