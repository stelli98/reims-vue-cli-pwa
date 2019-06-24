<template>
  <div class="home">
    <header class="home__header">
      <div class="home__header__upper">
        <div class="home__header__upper__left">
          <img src="../assets/images/logo.png" class="logo__small" />
        </div>
        <div class="home__header__upper__right">
          <div class="home__header__nav__user" @click="moveTo('user')">
            Manage User
          </div>
          <div
            class="home__header__nav__password"
            @click="moveTo('change-password')"
          >
            Change Password
          </div>
          <div class="home__header__nav__logout">
            Logout
          </div>
        </div>
      </div>
      <div class="home__header__footer">
        <div class="home__header__footer__container">
          <div class="home__header__footer__heading">
            Make Reimbursement Reporting Become Easier
          </div>
          <div class="home__header__footer__button">
            <input id="file" type="file" name="file" @change="onFileChange" />
            <label for="file" class="btn-white">
              Upload Receipt
            </label>
          </div>
        </div>
      </div>
    </header>
    <TransactionList :transactions="transactions" @openFilter="toogleFilter" />
    <Pagination :paging="pagination" @changePage="changePage" />
    <SortFilter
      v-show="showFilter"
      @closeFilter="toogleFilter"
      @applyFilter="applyFilter"
    >
    </SortFilter>
  </div>
</template>

<script src="./js/home-page.js"></script>

<style lang="scss">
.home__header {
  display: flex;
  background: $color-green-gradient-transparent;
  background-size: cover;
  background-position: center bottom;
  flex-direction: column;
  padding: 1.5rem 1rem;
  height: 45vh;

  @include respond(medium-phone) {
    height: 55vh;
  }

  @include respond(large-phone) {
    height: 65vh;
  }

  @include respond(tab) {
    height: 70vh;
  }
  &__upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__right {
      display: flex;
      color: $color-white;
      font-size: 1rem;
      font-family: "Nunito-Regular";

      @include respond(large-phone) {
        font-size: 1.2rem;
      }

      & > div,
      &:not(:last-child) {
        margin-right: 1rem;

        @include respond(large-phone) {
          margin-right: 1.5rem;
        }
      }

      & > div:hover {
        cursor: pointer;
      }
    }
  }

  &__footer {
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-grow: 1;

    @include respond(large-phone) {
      align-items: flex-end;
    }
    &__container {
      @include respond(large-phone) {
        width: 45%;
      }

      @include respond(tab) {
        width: 40%;
      }

      @include respond(desktop) {
        width: 30%;
      }
    }

    &__section > div {
      margin-bottom: 2rem;
    }

    &__heading {
      color: #fff;
      font-size: 1.6rem;
      font-family: "Nunito-Bold";
      margin: 2rem auto;
      width: 70%;
      @include respond(large-phone) {
        width: 100%;
      }

      @include respond(desktop) {
        font-size: 2rem;
      }
    }
  }
}

#file {
  display: none;
}
</style>
