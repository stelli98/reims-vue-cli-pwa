<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>Fuel Type</h3>
      <p>{{ transaction.type | textFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Liters</h3>
      <p>{{ transaction.liters }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Kilometers</h3>
      <p>{{ transaction.kilometers}}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Location</h3>
      <p>{{ transaction.location}}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Amount</h3>
      <p>{{ transaction.amount | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-fuel-detail.js"></script>


