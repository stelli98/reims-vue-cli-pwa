<template>
  <div class="home">
    <div
      class="background-dark background-dark__home"
      v-if="actionButtonActive"
    ></div>
    <header class="home__header">
      <div class="home__header__upper">
        <div class="home__header__upper__left">
          <img src="@/assets/images/logo.png" class="logo__small" />
        </div>
        <div class="home__header__upper__right">
          <div
            class="home__header__nav__password"
            @click="moveTo('edit-profile')"
          >
            Edit Profile
          </div>
          <div class="home__header__nav__logout" @click="doLogout">
            Logout
          </div>
        </div>
      </div>
      <div class="home__header__footer">
        <div class="home__header__footer__container">
          <div class="heading home__header__footer__heading">
            Make Reimbursement Reporting Become Easier
          </div>
        </div>
      </div>
    </header>
    <TransactionList
      :transactions="transactions"
      @openFilter="toogleFilter"
      @deleteTransaction="updateTransaction"
    />
    <Pagination
      :paging="pagination"
      @changePage="changePage"
    />
    <SortFilter v-show="showFilter" @closeFilter="toogleFilter"> </SortFilter>
    <FloatingActionButton
      :class="actionButtonClass"
      @isActionButtonActive="toggleActionButton"
      v-if="!showFilter"
    >
    </FloatingActionButton>
  </div>
</template>

<script src="./js/home-page.js"></script>
<style lang="scss" scoped>
.action-button-false {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

.action-button-true {
  position: sticky;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

.background-dark__home {
  width: 100vw;
  height: 100vh;
}

.home {
  position: relative;
  width: 100vw;
  min-height: 98vh;

  &__header {
    display: flex;
    background: $color-green-gradient-transparent;
    background-size: cover;
    background-position: center bottom;
    flex-direction: column;
    padding: 1.5rem 1rem 0;
    height: 28vh;

    @include respond(medium-phone) {
      height: 40vh;
    }

    @include respond(large-phone) {
      height: 50vh;
    }

    @include respond(tab) {
      height: 55vh;
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
        width: 92%;
        @include respond(large-phone) {
          width: 100%;
        }

        @include respond(desktop) {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
