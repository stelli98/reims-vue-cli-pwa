<template>
  <div class="transaction">
    <div class="heading transaction__heading">
      Transaction List
    </div>
    <div class="transaction__actions">
      <div class="transaction__actions__left">
        <div class="custom-selection">
          <select class="custom-select" v-model="selectedTransactionType">
            <option
              v-for="(type, index) in transactionType"
              :selected="selectedTransactionType"
              :key="index"
              :value="type"
            >
              {{ type | textFormatter }} List</option
            >
          </select>
        </div>
      </div>
      <div class="transaction__actions__right">
        <div class="btn-white transaction__filter" @click="openFilter">
          <div class="transaction__icon">
            <svg class="icon icon-green">
              <use xlink:href="icons.svg#icon-filter" />
            </svg>
          </div>
          <div class="notification-circle" v-if="isFiltering"></div>
        </div>
        <div class="btn-white transaction__download" @click="downloadReport">
          <svg class="icon icon-green">
            <use xlink:href="icons.svg#icon-download" />
          </svg>
        </div>
      </div>
    </div>
    <div class="transaction__list">
      <div>
        <TransactionCard
          v-for="transaction in transactions"
          :key="transaction.id"
          :transaction="transaction"
          @deleteATransaction="deleteTransaction"
        />
      </div>
    </div>
    <PopUpModalRoot />
  </div>
</template>

<script src="./js/transaction-list.js"></script>

<style lang="scss">
.transaction {
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 1.5rem 5vw 0;

  @include respond(large-phone) {
    width: 50vw;
    margin: 2rem 25vw;
  }

  &__filter {
    position: relative;
  }

  &__actions {
    display: flex;
    justify-content: space-between;

    &__right {
      display: flex;
      justify-content: space-between;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    position: relative;
  }

  &__list {
    margin-top: 1.5rem;
  }
}
.notification-circle {
  width: 0.6rem;
  height: 0.6rem;
  background: #49a969;
  border-radius: 100%;
  position: absolute;
  top: 25%;
  right: 25%;
}

.custom-selection {
  position: relative;
  &:after {
    content: "\25BE";
    position: absolute;
    top: 12.5%;
    right: -5%;
    color: $color-white;
    font-size: 1.5rem;
    pointer-events: none;
    z-index: 2;
  }
}

.custom-select {
  position: relative;
  background-color: $color-green;
  color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  border: 0 !important;
  background-image: none;
  height: 100%;
  width: 120%;
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);

  &:active {
    border: solid 10px red;
  }
}
</style>
