<template>
  <form class="transaction-form__parking">
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Title
      </label>
      <input
        v-model="parking.title"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.parking.title.$touch()"
      />
      <div v-if="$v.parking.title.$error">
        <p
          v-if="!$v.parking.title.required"
          class="input__error-message"
        >
          Title must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="date"
      >
        In
      </label>
      <Datetime
        v-model="parking.date"
        type="datetime"
        class="form__input"
        :max-datetime="parking.out"
        @close="$v.parking.date.$touch()"
      />
      <div v-if="$v.parking.date.$error">
        <p
          v-if="!$v.parking.date.required"
          class="input__error-message"
        >
          In DateTime must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="date"
      >
        Out
      </label>
      <Datetime
        v-model="parking.out"
        type="datetime"
        class="form__input"
        :min-datetime="parking.date"
        @close="$v.parking.out.$touch()"
      />
      <div v-if="$v.parking.out.$error">
        <p
          v-if="!$v.parking.out.required"
          class="input__error-message"
        >
          Out DateTime must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Price
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          v-model="parkingAmount"
          type="text"
          name="type"
          class="form__currency__input"
        />
      </div>

      <div v-if="$v.parking.amount.$error">
        <p
          v-if="!$v.parking.amount.required"
          class="input__error-message"
        >
          Price must be filled
        </p>
      </div>
      <p
        v-if="!$v.parking.amount.currency && $v.parking.amount.required"
        class="input__error-message"
      >
        Price must be only filled in IDR currency format
      </p>
      <p
        v-if="!$v.amountInt.minValue && $v.parking.amount.currency"
        class="input__error-message"
      >
        Price must more than 100
      </p>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Vehicle Type
      </label>
      <select
        v-model="parking.parkingType"
        class="form__input form__input__select"
        @blur="$v.parking.parkingType.$touch()"
      >
        <option
          v-for="type in type"
          :key="type"
          :value="type"
          :selected="parking.parkingType"
        >
          {{ type | textFormatter}}
        </option>
      </select>
      <div v-if="$v.parking.parkingType.$error">
        <p
          v-if="!$v.parking.parkingType.required"
          class="input__error-message"
        >
          Vehicle Type must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        License
      </label>
      <input
        v-model="parking.license"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.parking.license.$touch()"
      />
      <div v-if="$v.parking.license.$error">
        <p
          v-if="!$v.parking.license.required"
          class="input__error-message"
        >
          License must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Location
      </label>
      <input
        v-model="parking.location"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.parking.location.$touch()"
      />
      <div v-if="$v.parking.location.$error">
        <p
          v-if="!$v.parking.location.required"
          class="input__error-message"
        >
          Location must be filled
        </p>
      </div>
    </div>
  </form>
</template>

<script src="./js/parking-form.js"></script>

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
