<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>In</h3>
      <p>{{ transaction.date | dateFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Hours</h3>
      <p>{{ transaction.hours }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Vehicle Type</h3>
      <p>{{ transaction.type | textFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>License</h3>
      <p>{{ transaction.license }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Location</h3>
      <p>{{ transaction.location }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Price</h3>
      <p>{{ transaction.amount | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-parking-detail.js"></script>

<style lang="scss"></style>
