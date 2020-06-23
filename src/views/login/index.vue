<template>
  <div class="login">
    <!-- <div class="background"></div> -->
    <div class="auth">
      <div class="background"></div>
      <div class="auth-container">
        <div class="card">
          <header class="auth-header">
            <h1 class="auth-title">
              <div class="logo">
                <span class="l l1"></span>
                <span class="l l2"></span>
                <span class="l l3"></span>
                <span class="l l4"></span>
                <span class="l l5"></span>
              </div>
              Banan ERP
            </h1>
          </header>
          <div class="auth-content">
            <p class="text-center">LOGIN</p>
            <div
              class="alert alert-danger"
              style="border-radius: 0;"
              v-if="error"
            >
              {{ error }}
            </div>
            <form
              id="login-form"
              action="/index.html"
              method="GET"
              novalidate=""
            >
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  v-model="email"
                  type="text"
                  class="form-control underlined"
                  name="username"
                  id="username"
                  placeholder="Your username"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control underlined"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="remember">
                  <input class="checkbox" id="remember" type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="reset.html" class="forgot-btn pull-right"
                  >Forgot password?</a
                >
              </div>
              <div class="form-group">
                <button
                  @click.prevent="performLogin"
                  type="submit"
                  class="btn btn-block btn-primary"
                >
                  Login
                </button>
              </div>
              <div class="form-group">
                <p class="text-muted text-center">
                  Do not have an account? <a href="signup.html">Sign Up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="isLoading"></Loading>
    <!-- Reference block for JS -->
    <div class="ref" id="ref">
      <div class="color-primary"></div>
      <div class="chart">
        <div class="color-primary"></div>
        <div class="color-secondary"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/global/loading/index";

export default {
  name: "login",
  components: {
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isLoading: false,
    };
  },
  methods: {
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginAction", {
          username: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.$router.push("/profile");
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = " There was error during login process";
          console.log(err.message);
        });
    },
  },
};
</script>

<style>
#nav {
  display: none;
}
.card {
  background-color: #fff !important;
}
.background {
  background-image: url("../../../public/images/bg.jpg");
  left: 0;
  top: 0;
}
</style>
