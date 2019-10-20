<template>
  <div class="edit-family-profile">
    <div class="header edit-family-profile__header"></div>
    <div class="edit-family-profile__content">
      <div class="heading edit-family-profile__heading">Edit Family Profile</div>
      <form class="user-form__form edit-family-profile__form" v-for="(userFamily,index) in userFamily" :key="userFamily.id">
        <h3>{{userFamily.relationship | textFormatter}}</h3>
        <hr class="edit-family-profile__line"/>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Name</label>
          <input
            v-model="userFamily.name"
            type="name"
            name="type"
            class="form__input"
            @blur="$v.userFamily.$each[index].name.$touch()"
          />
          <div v-if="$v.userFamily.$each[index].name.$error">
            <p
              v-if="!$v.userFamily.$each[index].name.required"
              class="input__error-message"
            >Name must be filled</p>
          </div>
          
          <div v-if="$v.userFamily.$each[index].name.$error">
            <p
              v-if="!$v.userFamily.$each[index].name.minLength"
              class="input__error-message"
            >Name must have at least 3 characters</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="date">Date of Birth</label>
          <Datetime
            v-model="userFamily.dateOfBirth"
            type="date"
            class="form__input"
            :max-datetime="currentDateTime"
            @close="$v.userFamily.$each[index].dateOfBirth.$touch()"
          />
          <div v-if="$v.userFamily.$each[index].dateOfBirth.$error">
            <p v-if="!$v.userFamily.dateOfBirth.required" class="input__error-message">Date must be filled</p>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation edit-family-profile__navigation">
      <div class="title--navigation" @click="moveTo('user-detail')">Cancel</div>
      <div class="title--navigation" @click="submitChangePasswordForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/edit-user-family-profile.js"></script>

<style lang="scss">
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.edit-family-profile {
  &__content {
    width: 65vw;
    min-height: 78vh;
    margin: 0 auto;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

  &__form{
    margin-bottom: 2rem;
  }

  &__line{
    margin-bottom: 1rem;
  }
  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond(large-phone) {
      justify-content: space-evenly;
    }
  }
}
</style>
