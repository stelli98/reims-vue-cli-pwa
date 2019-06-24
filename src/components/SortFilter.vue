<template>
  <transition name="slide">
    <div class="sort-filter">
      <div class="sort-filter__header">
        <div class="sort-filter__close" @click="moveTo">
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-cancel" />
          </svg>
        </div>
        <div class="title--menu user-form__next" @click="resetFilter">
          RESET
        </div>
      </div>
      <div class="sort-filter__content">
        <div class="sort-filter__heading">
          Filter and Sort
        </div>
        <form class="sort-filter__form">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              Keyword Search
            </label>
            <input
              v-model="options.search"
              type="text"
              name="type"
              class="form__input"
            />
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              Sort By
            </label>

            <select
              v-model="options.sortBy"
              class="form__input form__input__select"
            >
              <option
                v-for="option in sortByOptions"
                :key="option"
                :value="option"
                :selected="options.sortBy"
              >
                {{ option | textFormatter }}
              </option>
            </select>
          </div>
        </form>
        <div class="sort-filter__heading">
          Filter By
        </div>
        <form class="sort-filter__form">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              Category
            </label>

            <select
              v-model="options.category"
              class="form__input form__input__select"
            >
              <option
                v-for="option in categoryOptions"
                :key="option"
                :value="option"
                :selected="options.category"
              >
                {{ option | textFormatter }}
              </option>
            </select>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              Start Date
            </label>
            <Datetime
              v-model="options.startDate"
              type="datetime"
              class="form__input"
              :max-datetime="options.endDate"
            />
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              End Date
            </label>
            <Datetime
              v-model="options.endDate"
              :min-datetime="options.startDate"
              type="datetime"
              class="form__input"
            />
          </div>
        </form>
      </div>
      <div class="sort-filter__button" @click="applyFilter">
        <div class="btn-green ">
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-filter" />
          </svg>
          <span>Apply Filter</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Datetime } from "vue-datetime";
export default {
  components: { Datetime },
  data() {
    return {
      options: this.emptyOptions(),
      sortByOptions: ["date", "category", "title"],
      categoryOptions: ["FUEL", "PARKING"]
    };
  },
  methods: {
    moveTo() {
      this.$emit("closeFilter", false);
    },
    applyFilter() {
      this.$emit("applyFilter", this.options);
      this.moveTo();
    },
    emptyOptions() {
      return {
        search: "",
        sortBy: "",
        category: "",
        startDate: "",
        endDate: ""
      };
    },
    resetFilter() {
      this.options = this.emptyOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  overflow: hidden;
}
.slide-enter,
.slide-leave-to {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.sort-filter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;

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

  &__button {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
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
