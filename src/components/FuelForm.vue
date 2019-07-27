<template>
  <form class="transaction-form__fuel">
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Title
      </label>
      <input
        v-model="fuel.title"
        type="text"
        name="type"
        class="form__input"
        @blur="$v.fuel.title.$touch()"
      />
      <div v-if="$v.fuel.title.$error">
        <p
          v-if="!$v.fuel.title.required"
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
        Date
      </label>
      <Datetime
        v-model="fuel.date"
        type="datetime"
        class="form__input"
        :max-datetime="fuel.date"
        @close="$v.fuel.date.$touch()"
      />
      <div v-if="$v.fuel.date.$error">
        <p
          v-if="!$v.fuel.date.required"
          class="input__error-message"
        >
          Date must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Fuel Type
      </label>
      <select
        v-model="fuel.fuelType"
        class="form__input form__input__select"
        @blur="$v.fuel.fuelType.$touch()"
      >
        <option
          v-for="fuel in fuelType"
          :key="fuel"
          :value="fuel"
          :selected="fuel.fuelType"
        >
          {{ fuel | textFormatter}}
        </option>
      </select>

      <div v-if="$v.fuel.fuelType.$error">
        <p
          v-if="!$v.fuel.fuelType.required"
          class="input__error-message"
        >
          Fuel Type must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Volume
      </label>
      <input
        v-model="fuel.liters"
        type="text"
        name="type"
        class="form__input"
        placeholder=" ex: 1000.34, 1.34, 1.00, 1"
        @blur="$v.fuel.liters.$touch()"
      />
      <div v-if="$v.fuel.liters.$error">
        <p
          v-if="!$v.fuel.liters.float"
          class="input__error-message"
        >
          Volume must be decimal ex: 100.34, 1.34, 1.00, 1
        </p>
      </div>

      <div v-if="$v.fuel.liters.$error">
        <p
          v-if="!$v.fuel.liters.required"
          class="input__error-message"
        >
          Volume must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Unit Price
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          v-model="fuel.amount"
          type="text"
          name="type"
          class="form__currency__input"
          @blur="formatAmount"
        />
      </div>
      <div v-if="$v.fuel.amount.$error">
        <p
          v-if="!$v.fuel.amount.required"
          class="input__error-message"
        >
          Unit Price must be filled
        </p>
      </div>
      <div v-if="$v.fuel.amount.$error">
        <p
          v-if="!$v.fuel.amount.currency"
          class="input__error-message"
        >
          Unit Price must be only filled in IDR currency format
        </p>
      </div>
    </div>
    <div class="form__child">
      <label
        class="input__label title--medium-form"
        for="type"
      >
        Total Price
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          v-model="totalPrice"
          type="text"
          name="type"
          class="form__currency__input"
          disabled="true"
        />
      </div>
    </div>
  </form>
</template>

<script src="./js/fuel-form.js"></script>

<style lang="scss"></style>
