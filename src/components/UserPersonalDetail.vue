<template>
  <div>
    <div class="user-personal__detail">
      <div class="user-personal__personal">
        <div class="user-personal__sub-heading">
          <h3>Personal Data</h3>
          <hr />
        </div>
        <div class="user-personal__list">
          <div class="user-personal__box">
            <p class="title--big">Username</p>
            <span>{{user.username}}</span>
          </div>
          <div class="user-personal__box">
            <p class="title--big">Date of Birth</p>
            <span>{{user.dateOfBirth | dateFormatter}}</span>
          </div>
          <div class="user-personal__box">
            <p class="title--big">Gender</p>
            <span>{{user.gender | textFormatter }}</span>
          </div>
          <div class="user-personal__box">
            <p class="title--big">Division</p>
            <span>{{user.division | textFormatter}}</span>
          </div>
        </div>
      </div>
      <div class="user-personal__vehicle">
        <div class="user-personal__sub-heading">
          <h3>Vehicle Data</h3>
          <hr />
        </div>
        <div class="user-personal__list">
          <div class="user-personal__box">
            <p class="title--big">Plate Number</p>
            <span>{{user.vehicle.plateNumber || ""}}</span>
          </div>
          <div class="user-personal__box">
            <p class="title--big">Vehicle Type</p>
            <span>{{user.vehicle.type || ""}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-navigation user-personal__navigation">
      <div class="title--navigation" @click="moveTo('change-password')">Change Password</div>
      <div class="title--navigation" @click="moveTo('edit-personal-profile')">Edit Profile</div>
    </div>
  </div>
</template>

<script src="./js/user-personal-detail.js"></script>

<style lang="scss" scoped>
.user-personal {
  &__detail {
    min-height: 65vh;
    margin: 0 1.5rem;
    @include respond(large-phone) {
      width: 50vw;
      margin: 2rem 25vw;
      min-height: 55vh;
    }
  }

  &__box {
    margin: 1rem 0;
    p {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  &__personal,
  &__vehicle {
    margin: 1.5rem 0;
  }
}
</style>