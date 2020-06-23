<template>
  <div>
    <div class="background"></div>
    <router-link  to="/login" class="btn btn-success">
      <i v-if="!loggedIn" class="fa fa-sign-in">Login</i>
      <i v-if="loggedIn" class="fa fa-sign-in" @click.prevent="performLogout">Logout</i>
    </router-link>

    <div class="msg">
      <h1>Welcome Mr {{ user.first_name +" "+user.last_name }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-image: url("../../../public/images/bg.jpg");
  left: 0;
  top: 0;
}
a.btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}
.msg {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>

<script>
export default {
  data() {
    return {
      token: null
    };
  },
  mounted() {
    this.checkUserStatus();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    user() {
      return this.$store.getters.get_user;
    }
  },
  methods: {
    checkUserStatus() {
      if (localStorage.getItem("token") != null) {
        this.token = localStorage.getItem("token");
      }
    },
    performLogout() {
      this.$store.dispatch("performLogoutAction");
      this.$router.push("/login");
    }
  }
};
</script>
