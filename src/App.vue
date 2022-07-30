<template>
  <nav class="container text-center">
    <router-link to="/dashboard">Dashboard</router-link> |

    <!-- <router-link to="/">Home</router-link> | -->
    <router-link to="/about">About</router-link> |
    <router-link to="/">Login</router-link>
  </nav>
  <router-view />
</template>

<script>
import axios from "axios";
// import Pusher from "pusher-js";

export default {
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        this.$store.commit("SET_USER_DATA", userData);
      } catch (error) {
        console.log("error in parsing", error);
      }
    }

    // this.subscribe();
  },
  mounted() {
    axios
      .post(`${process.env.VUE_APP_BASE_URL}auth/refresh-token`)
      .then((res) => {
        this.$store.commit("SET_USER_DATA", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // methods: {
  //   subscribe() {
  //     let user = JSON.parse(localStorage.getItem("user"));
  //     console.log(user.access_token);
  //     let pusher = new Pusher("d44e3d910d38a928e0be", {
  //       channelAuthorization: {
  //         endpoint: "https://frontend-test-api.aircall.io/pusher/auth",
  //         auth: user.access_token,
  //       },
  // authEndpoint: "https://frontend-test-api.aircall.io/pusher/auth",

  //   cluster: "eu",
  // });

  // var currentState = pusher.connection.state;
  // console.log("SOCKET STATE ", currentState);

  // pusher.connection.bind("state_change", function (states) {
  //   var prevState = states.previous;
  //   var currState = states.current;
  //   console.log(prevState, currState);
  // });

  // var currentState = pusher.connection.state;
  // pusher.bind_global((dat) => {
  //   console.log("FROM PUSHER");
  //   console.log(dat);
  // });

  // pusher.subscribe("private-aircall");
  // pusher.bind("update-call", (data) => {
  //   console.log(data);
  // });
  // var channel = pusher.subscribe("private-aircall");
  // console.log("channel", channel);
  // // function arch() {
  // //   axios.put(`${process.env.VUE_APP_BASE_URL}calls/${this.id}/archive`);
  // // }

  // const bind = channel.bind("update-call", (dat) => {
  //   console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  //   console.log(dat);
  // });
  // console.log("bind", bind);

  // console.log("after");
  //   },
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
