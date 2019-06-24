<template>
  <form class="transaction-form__fuel">
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
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
        <p v-if="!$v.fuel.title.required" class="input__error-message">
          Title must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="date">
        Date
      </label>
      <div v-if="$v.fuel.date.$error">
        <p v-if="!$v.fuel.date.required" class="input__error-message">
          Date must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Fuel Type
      </label>
      <select
        v-model="fuel.type"
        class="form__input form__input__select"
        @blur="$v.fuel.type.$touch()"
      >
        <option
          v-for="fuel in fuelType"
          :key="fuel"
          :value="fuel"
          :selected="fuel.type"
        >
          {{ fuel }}
        </option>
      </select>

      <div v-if="$v.fuel.type.$error">
        <p v-if="!$v.fuel.type.required" class="input__error-message">
          Fuel Type must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Volume
      </label>
      <input
        v-model="fuel.volume"
        type="text"
        name="type"
        class="form__input"
        placeholder=" ex: 1000.34, 1.34, 1.00, 1"
        @blur="$v.fuel.volume.$touch()"
      />
      <div v-if="$v.fuel.volume.$error">
        <p v-if="!$v.fuel.volume.float" class="input__error-message">
          Volume must be decimal ex: 100.34, 1.34, 1.00, 1
        </p>
      </div>
      <div v-if="$v.fuel.volume.$error">
        <p v-if="!$v.fuel.volume.required" class="input__error-message">
          Volume must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Unit Price
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          v-model="fuel.unitPrice"
          type="text"
          name="type"
          class="form__currency__input"
          @blur="formatUnitPrice"
        />
      </div>
      <div v-if="$v.fuel.unitPrice.$error">
        <p v-if="!$v.fuel.unitPrice.required" class="input__error-message">
          Unit Price must be filled
        </p>
      </div>
      <div v-if="$v.fuel.unitPrice.$error">
        <p v-if="!$v.fuel.unitPrice.currency" class="input__error-message">
          Unit Price must be only filled in IDR currency format
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
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

<script>
import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
const float = helpers.regex("numeric", /\d*\.?\d*$/);
const currency = helpers.regex(
  "numeric",
  /(\d{1,3}[.](\d{3}[.])*\d{3}|\d+)([,]\d{1,2})?$/
);

export default {
  components: { Datetime },
  validations: {
    fuel: {
      date: { required },
      type: { required },
      volume: { required, float },
      unitPrice: { required, currency },
      title: { required }
    }
  },
  data() {
    return {
      isSwitchOn: {
        type: Boolean,
        default: true
      },
      fuelType: ["Pertalite", "Pertamax", "Premium", "Solar"]
    };
  },
  computed: {
    ...mapState("transaction", ["fuel"]),
    totalPrice() {
      const value = (this.unitPrice * this.fuel.volume).toString();
      if (value.includes("e")) {
        return value;
      }
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    unitPrice() {
      if (typeof this.fuel.unitPrice === "string") {
        return parseInt(this.fuel.unitPrice.split(".").join(""));
      } else {
        return this.fuel.unitPrice;
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendFuelForm() {
      this.$v.fuel.$touch();
      if (!this.$v.fuel.$invalid) {
        this.reformatUnitPrice();
        this.saveTransaction(this.fuel);
        this.$router.push({ name: "home" });
      } else {
        console.log("error");
      }
    },
    formatUnitPrice() {
      this.$v.fuel.unitPrice.$touch();
      this.fuel.unitPrice = this.fuel.unitPrice
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatUnitPrice() {
      this.fuel.unitPrice = parseInt(this.fuel.unitPrice.split(".").join(""));
    }
  },
  mounted() {
    this.formatUnitPrice();
  }
};
</script>

<style lang="scss" scoped>
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
