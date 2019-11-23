<template>
  <transition name="slide">
    <div class="sort-filter">
      <div class="header sort-filter__header">
        <div class="sort-filter__close" @click="closeFilterForm">
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-cancel" />
          </svg>
        </div>
      </div>
      <div class="sort-filter__content">
        <div class="heading sort-filter__heading">
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
              v-model="formatStart"
              type="date"
              class="form__input"
              :max-datetime="formatEnd || currentDateTime"
            />
            <p v-if="isStartSelected" class="input__error-message">
              Start Date must be filled
            </p>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">
              End Date
            </label>
            <Datetime
              v-model="formatEnd"
              :min-datetime="formatStart"
              :max-datetime="currentDateTime"
              type="date"
              class="form__input"
            />
            <p v-if="isEndSelected" class="input__error-message">
              End Date must be filled
            </p>
          </div>
        </form>
      </div>
      <div class="bottom-navigation sort-filter__navigation">
        <div class="title--navigation" @click="resetFilter">Reset</div>
        <div class="title--navigation" @click="applyFilter">Apply Filter</div>
      </div>
    </div>
  </transition>
</template>

<script src="./js/sort-filter.js"></script>

<style lang="scss">
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

  &__content {
    width: 65vw;
    margin: 0 auto;
    min-height: 75vh;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

  &__button {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
