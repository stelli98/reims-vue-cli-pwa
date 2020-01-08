<template>
  <div class="create-transaction">
    <GlobalHeader />
    <div class="create-transaction__order">
      <div class="create-transaction__progress">
        <div
          class="create-transaction__progress-bar progress-bar-active"
          id="progress-bar-first"
        ></div>
        <div class="create-transaction__progress-text">Crop Image</div>
      </div>
      <div class="create-transaction__progress">
        <div
          :class="
            `create-transaction__progress-bar ${activeSecondProgressBar ||
              activeThirdProgressBar}`
          "
        ></div>
        <div class="create-transaction__progress-text">Filter Image</div>
      </div>
      <div class="create-transaction__progress">
        <div
          :class="`create-transaction__progress-bar ${activeThirdProgressBar}`"
          id="progress-bar-last"
        ></div>
        <div class="create-transaction__progress-text">Fill Form</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script src="./js/create-transaction.js"></script>

<style lang="scss">
.create-transaction {
  &__order {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  }

  &__progress {
    display: flex;
    justify-content: flex-start;
    width: 25%;
    flex-flow: column;

    &-bar {
      width: 100%;
      height: 0.5rem;
      display: flex;
      flex-flow: column;
      position: relative;
      background-color: $color-dark-grey;

      &:after {
        content: "";
        position: absolute;
        top: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: solid 0.3rem $color-dark-grey;
        border-left: solid 0.3rem transparent;
        border-right: solid 0.3rem transparent;
      }
    }

    &-text {
      text-align: center;
      margin-top: 1rem;
    }
  }

  .progress-bar-active,
  .progress-bar-half {
    background-color: $color-green;

    &:after {
      border-top: solid 0.3rem $color-green;
    }
  }

  #progress-bar-first {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  #progress-bar-last {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
