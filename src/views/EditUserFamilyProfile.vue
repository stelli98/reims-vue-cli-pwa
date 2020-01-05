<template>
  <div class="edit-family-profile">
    <GlobalHeader/>
    <div class="edit-family-profile__content">
      <div class="heading edit-family-profile__heading">Edit Family Profile</div>
      <form class="user-form__form edit-family-profile__form">
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Name</label>
          <input
            v-model="userFamily.name"
            type="name"
            name="type"
            class="form__input"
            @blur="$v.userFamily.name.$touch()"
          />
          <div v-if="$v.userFamily.name.$error">
            <p v-if="!$v.userFamily.name.required" class="input__error-message">Name must be filled</p>
          </div>
          <div v-if="$v.userFamily.name.$error">
            <p
              v-if="!$v.userFamily.name.minLength"
              class="input__error-message"
            >Name must have at least 3 characters</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="date">Date of Birth</label>
          <Datetime
            v-model="formatDate"
            type="date"
            class="form__input"
            :max-datetime="currentDateTime"
            @close="$v.userFamily.dateOfBirth.$touch()"
          />
          <div v-if="$v.userFamily.dateOfBirth.$error">
            <p
              v-if="!$v.userFamily.dateOfBirth.required"
              class="input__error-message"
            >Date must be filled</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form">Relationship</label>
          <p>{{userFamily.relationship | textFormatter}}</p>
        </div>
      </form>
    </div>
    <div class="bottom-navigation edit-family-profile__navigation">
      <div class="title--navigation" @click="moveToPreviousPage()">Cancel</div>
      <div class="title--navigation" @click="submitEditUserFamilyForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/edit-user-family-profile.js"></script>

<style lang="scss">
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.edit-family-profile {
  position: relative;
  height: 100vh;

  &__content {
    width: 70vw;
    margin: 0 auto;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

   &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @include respond(large-phone) {
      justify-content: space-evenly;
    }
  }
}
</style>
