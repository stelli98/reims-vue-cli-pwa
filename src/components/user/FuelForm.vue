<template>
  <form class="transaction-form__fuel">
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Title
      </label>
      <input
        autocomplete="off"
        v-model="fuel.title"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.fuel.title.$touch()"
      />
      <div v-if="$v.fuel.title.$error">
        <p v-if="!$v.fuel.title.required" class="input__error-message">
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
        @close="$v.fuel.date.$touch()"
      />
      <div v-if="$v.fuel.date.$error">
        <p v-if="!$v.fuel.date.required" class="input__error-message">
          Date must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Location
      </label>
      <input
        autocomplete="off"
        v-model="fuel.location"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.fuel.location.$touch()"
      />
      <div v-if="$v.fuel.location.$error">
        <p v-if="!$v.fuel.location.required" class="input__error-message">
          Location must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Fuel Type
      </label>

      <select
        v-model="fuel.fuelType"
        class="form__input form__input__select"
        @blur="$v.fuel.fuelType.$touch()"
      >
        <option
          v-for="option in fuelTypeOptions"
          :key="option"
          :value="option"
          :selected="fuel.fuelType"
        >
          {{ option | textFormatter }}
        </option>
      </select>
      <div v-if="$v.fuel.fuelType.$error">
        <p v-if="!$v.fuel.fuelType.required" class="input__error-message">
          Fuel Type must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Kilometer
      </label>
      <input
        autocomplete="off"
        v-model="fuel.kilometers"
        type="text"
        name="type"
        class="form__input"
        placeholder=" ex: 1.000, 30.000, 300"
        @blur="$v.fuel.kilometers.$touch()"
      />
      <p v-if="!$v.fuel.kilometers.required" class="input__error-message">
        Kilometer must be filled
      </p>
      <p
        v-if="!$v.fuel.kilometers.minValue && $v.fuel.kilometers.float"
        class="input__error-message"
      >
        Kilometer must more than 0.01
      </p>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Liters
      </label>
      <input
        autocomplete="off"
        v-model="fuel.liters"
        type="text"
        name="type"
        class="form__input"
        placeholder=" ex: 1.000, 30.000, 300"
        @blur="$v.fuel.liters.$touch()"
      />
      <p
        v-if="!$v.fuel.liters.float && $v.fuel.liters.required"
        class="input__error-message"
      >
        Liters must be decimal ex: 100.34, 1.34, 1.00, 1
      </p>
      <p v-if="!$v.fuel.liters.required" class="input__error-message">
        Liters must be filled
      </p>
      <p
        v-if="!$v.fuel.liters.minValue && $v.fuel.liters.float"
        class="input__error-message"
      >
        Liters must more than 0.01
      </p>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Amount
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          autocomplete="off"
          v-model="fuelAmount"
          type="text"
          name="type"
          class="form__currency__input"
        />
      </div>
      <p v-if="!$v.fuel.amount.required" class="input__error-message">
        Unit Price must be filled
      </p>
      <p
        v-if="!$v.fuel.amount.currency && $v.fuel.amount.required"
        class="input__error-message"
      >
        Unit Price must be only filled in IDR currency format
      </p>
      <p
        v-if="!$v.amountInt.minValue && $v.fuel.amount.currency"
        class="input__error-message"
      >
        Unit Price must more than 100
      </p>
    </div>
  </form>
</template>
<script src="./js/fuel-form.js"></script>

<style lang="scss">
@import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
</style>
