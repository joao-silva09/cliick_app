<template>
  <div style="height: 300px">
    <!-- <LoginMenu /> -->

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="../assets/img/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Entre na sua conta
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Senha</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-[#148] hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            @click.stop.prevent="login()"
            class="flex w-full justify-center rounded-md bg-[#148] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1B4B73] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :disabled="spinner.login"
          >
            <img
              v-if="spinner.login"
              src="../assets/img/spinner.svg"
              alt=""
              class="w-5 h-5 mr-2"
            />
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import cookie from "../services/cookie";
import { useUserStore } from "../stores/UserStore";

const storeUser = useUserStore();

export default {
  name: "Login",

  components: {},

  data() {
    return {
      email: "",
      password: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        login: false,
      },
    };
  },

  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.resetResponse();

      this.spinner.login = true;

      api
        .post("login", payload)
        .then((response) => {
          const token = `${response.data.token_type} ${response.data.access_token}`;
          cookie.setToken(token);

          storeUser.storeUser(response.data.data);

          this.$router.push({ name: "home" });
        })
        .catch((e) => {
          this.spinner.login = false;
          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "red";
          // this.response.message = message[errorCode];
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    },
  },
};
</script>

<style></style>
