<template>
  <div class="create-transaction">
    <div class="header create-transaction__header">
      <div class="create-transaction__close" @click="moveTo">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div
        class="title--menu create-transaction__next"
        @click="menuFunctionAction(menuAction)"
      >
        {{ menu }}
      </div>
    </div>
    <div class="create-transaction__order">
      <div class="create-transaction__step">
        <div class="create-transaction__progress">
          <div class="create-transaction__progress-bar">
            <div
              class="create-transaction__progress-bar--level"
              :class="{ half: activeTab > 1 }"
            />
            <div
              class="create-transaction__progress-bar--level"
              :class="{ full: activeTab >= 3 }"
            />
          </div>
        </div>
        <div class="create-transaction__step-child">
          <div class="create-transaction__step-content">
            <div
              class="create-transaction__step-number"
              :class="{ 'step-number-active': activeTab >= 1 }"
              @click="toStepOne"
            >
              1
            </div>
            <div
              class="create-transaction__step-description"
              :class="{ 'step-text-active': activeTab >= 1 }"
            >
              Crop Image
            </div>
          </div>

          <div class="create-transaction__step-content">
            <div
              class="create-transaction__step-number"
              :class="{ 'step-number-active': activeTab >= 2 }"
              @click="toStepTwo"
            >
              2
            </div>

            <div
              class="create-transaction__step-description"
              :class="{ 'step-text-active': activeTab >= 2 }"
              @click="toStepTwo"
            >
              Filter Image
            </div>
          </div>

          <div class="create-transaction__step-content">
            <div
              class="create-transaction__step-number"
              :class="{ 'step-number-active': activeTab >= 3 }"
              @click="toStepThree"
            >
              3
            </div>

            <div
              class="create-transaction__step-description"
              :class="{ 'step-text-active': activeTab >= 3 }"
              @click="toStepThree"
            >
              Fill Form
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-transaction__view">
      <Component
        :is="activeComponent"
        ref="generate"
        :picture-url="pictureUrl"
      />
    </div>
  </div>
</template>

<script src="./js/create-transaction.js"></script>

<style lang="scss">
.create-transaction {
  &__order {
    width: 70vw;
    margin: 1.5rem auto;
    position: relative;

    @include respond(tab) {
      width: 50vw;
    }
  }

  &__progress {
    position: absolute;
    width: 100%;
    height: 3rem;
    z-index: -999;
  }

  &__progress-bar {
    display: flex;
    height: 85%;
    width: 100%;
    align-items: center;
    justify-content: center;

    &--level {
      opacity: 1;
      width: 40%;
      height: 35%;
      background-color: $color-grey;
      -webkit-transition: width 0.6s ease;
      -o-transition: width 0.6s ease;
      transition: width 0.6s ease;

      @include respond(medium-phone) {
        width: 45%;
      }
    }
  }

  .half,
  .full {
    background-color: $color-green;
  }

  &__step {
    display: flex;
    flex-flow: column;
    width: 100%;
    color: $color-green;

    &-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &-content {
      align-items: center;
      display: flex;
      flex-flow: column;
    }

    &-number {
      padding: 0.45rem 0.9rem;
      border-radius: 100%;
      background-color: $color-white;
      border: solid 0.2rem $color-green;
      -webkit-transition: background-color 0.6s ease, border-color 0.6s ease;
      -o-transition: background-color 0.6s ease, border-color 0.6s ease;
      transition: background-color 0.6s ease, border-color 0.6s ease;
      cursor: pointer;
    }

    &-description {
      color: $color-green;
      margin-top: 0.5rem;
    }

    .step-number-active {
      color: $color-white;
      background-color: $color-green;
    }

    .step-text-active {
      color: $color-green;
      font-weight: 700;
    }
  }
}
</style>
