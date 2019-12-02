<template>
  <div class="transaction">
    <div class="heading transaction__heading">
      Transaction List
    </div>
    <div class="transaction__actions">
      <div class="btn-green transaction__filter" @click="openFilter">
        <div class="transaction__icon">
          <div v-if="isFiltering" class="notification-circle"></div>
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-filter" />
          </svg>
        </div>
        <span>Filter and Sort</span>
      </div>
      <div class="btn-green transaction__download" @click="downloadReport">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-download" />
        </svg>
        <span>Download Report</span>
      </div>
    </div>
    <div class="transaction__list">
      <div v-for="(transaction,index) in transactions" :key="index">
        <TransactionCard :key="transaction.id" :transaction="transaction" @deleteATransaction="deleteTransaction"/>
      </div>
    </div>
    <PopUpModalRoot/>
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

  &__actions {
    display: flex;
    justify-content: space-evenly;
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
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  border-radius: 100%;
  position: absolute;
  top: 0px;
  left: 12px;
  @include respond(large-phone) {
    left: 14px;
  }
}
</style>
