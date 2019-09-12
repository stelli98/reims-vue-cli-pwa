<template>
  <div>
    <div v-show="transactionDisabled" class="background-dark background-dark__transaction"></div>
    <div class="create-transaction">
      <div class="header create-transaction__header">
        <div class="create-transaction__close" @click="moveTo">
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-back" />
          </svg>
        </div>
      </div>
      <div class="create-transaction__order">
        <div class="create-transaction__progress">
            <div class="create-transaction__progress-bar progress-bar-active" id="progress-bar-first">
            </div>
            <div class="create-transaction__progress-text">
              Crop Image
            </div>        
        </div>
        <div class="create-transaction__progress">
            <div class="create-transaction__progress-bar">
            </div>
            <div class="create-transaction__progress-text">
              Filter Image
            </div>        
        </div>
        <div class="create-transaction__progress">
            <div class="create-transaction__progress-bar" id="progress-bar-last">
            </div>
            <div class="create-transaction__progress-text">
              Fill Form
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
  </div>
</template>

<script src="./js/create-transaction.js"></script>

<style lang="scss">
.background-dark__transaction{
  width: 100vw;
  height: 120vh;
}

.create-transaction {
  height: 100vh;

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
    
    &-bar{
      width: 100%;
      height: .5rem;
      display: flex;
      flex-flow: column;
      position: relative;
      background-color: $color-dark-grey;

      &:after{
        content: '';
        position: absolute;
        top: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: solid .3rem $color-dark-grey;
        border-left: solid .3rem transparent;
        border-right: solid .3rem transparent;
      }

    }

    &-text{
      text-align: center;
      margin-top: 1rem;
    }
  }
  
  .progress-bar-active{
      background-color: $color-green;

      &:after{
        border-top: solid .3rem $color-green;
      }
  }

  .half,
  .full {
    background-color: $color-green;
  }

  #progress-bar-first{
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
  }
  #progress-bar-last{
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }
}


</style>
