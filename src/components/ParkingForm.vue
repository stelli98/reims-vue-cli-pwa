<template>
  <form class="transaction-form__parking">
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
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
        <p v-if="!$v.parking.title.required" class="input__error-message">
          Title must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="date">
        In
      </label>
      <Datetime
        v-model="parking.in"
        type="datetime"
        class="form__input"
        :max-datetime="parking.out"
        @close="$v.parking.in.$touch()"
      />
      <div v-if="$v.parking.in.$error">
        <p v-if="!$v.parking.in.required" class="input__error-message">
          In DateTime must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="date">
        Out
      </label>
      <Datetime
        v-model="parking.out"
        type="datetime"
        class="form__input"
        :min-datetime="parking.in"
        @close="$v.parking.out.$touch()"
      />
      <div v-if="$v.parking.out.$error">
        <p v-if="!$v.parking.out.required" class="input__error-message">
          Out DateTime must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Price
      </label>
      <div class="form__currency">
        <p class="form__currency__symbol">
          Rp.
        </p>
        <input
          v-model="parking.price"
          type="text"
          name="type"
          class="form__currency__input"
          @blur="formatPrice"
        />
      </div>

      <div v-if="$v.parking.price.$error">
        <p v-if="!$v.parking.price.required" class="input__error-message">
          Price must be filled
        </p>
      </div>
      <div v-if="$v.parking.price.$error">
        <p v-if="!$v.parking.price.currency" class="input__error-message">
          Price must be only filled in IDR currency format
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
        Vehicle Type
      </label>
      <select
        v-model="parking.vehicle"
        class="form__input form__input__select"
        @blur="$v.parking.vehicle.$touch()"
      >
        <option
          v-for="vehicle in vehicleType"
          :key="vehicle"
          :value="vehicle"
          :selected="parking.vehicle"
        >
          {{ vehicle }}
        </option>
      </select>
      <div v-if="$v.parking.vehicle.$error">
        <p v-if="!$v.parking.vehicle.required" class="input__error-message">
          Vehicle Type must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
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
        <p v-if="!$v.parking.license.required" class="input__error-message">
          License must be filled
        </p>
      </div>
    </div>
    <div class="form__child">
      <label class="input__label title--medium-form" for="type">
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
        <p v-if="!$v.parking.location.required" class="input__error-message">
          Location must be filled
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
const currency = helpers.regex(
  "numeric",
  /(\d{1,3}[.](\d{3}[.])*\d{3}|\d+)([,]\d{1,2})?$/
);

export default {
  components: { Datetime },
  validations: {
    parking: {
      in: { required },
      out: { required },
      price: { required, currency },
      title: { required },
      vehicle: { required },
      license: { required },
      location: { required }
    }
  },
  data() {
    return {
      isSwitchOn: {
        type: Boolean,
        default: true
      },
      vehicleType: ["Bus", "Car", "Motorcycle", "Van"]
    };
  },
  computed: {
    ...mapState("transaction", ["parking"])
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendParkingForm() {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        this.saveTransaction(this.parking);
        this.$router.push({ name: "home" });
      } else {
        console.log("error");
      }
    },
    formatPrice() {
      this.$v.parking.price.$touch();
      this.parking.price = this.parking.price
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatPrice() {
      this.parking.price = parseInt(this.parking.price.split(".").join(""));
    }
  },
  mounted() {
    this.formatPrice();
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
