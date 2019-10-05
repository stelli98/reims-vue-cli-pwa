<template>
  <div class="user-family">
    <div class="user-family__detail">
      <div class="user-family__markdown">
        <div class="user-family__heading">
          <h4>Wife</h4>
          <svg class="icon-small">
            <use xlink:href="icons.svg#icon-down" />
          </svg>
        </div>
        <hr />
      </div>
      <div class="user-family__data">
        <div class="user-family__box">
          <p class="title--big">Plate Number</p>
          <span>TEST</span>
        </div>
        <div class="user-family__box">
          <p class="title--big">Plate Number</p>
          <span>TEST</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-family {
  &__detail {
    margin: 0 1.5rem;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem;
  }

  &__box {
    padding: 0 1rem;
    p {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>