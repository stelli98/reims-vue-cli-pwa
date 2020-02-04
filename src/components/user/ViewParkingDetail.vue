<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>Location</h3>
      <p>{{ transaction.location }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Amount</h3>
      <p>{{ transaction.amount | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-parking-detail.js"></script>

<style lang="scss"></style>
