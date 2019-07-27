<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>Fuel Type</h3>
      <p>{{ transaction.type | textFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Volume</h3>
      <p>{{ transaction.liters }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Unit Price</h3>
      <p>{{ transaction.amount | priceFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Price</h3>
      <p>{{ totalPrice | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-fuel-detail.js"></script>

<style lang="scss" ></style>
