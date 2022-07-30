<template>
  <div class="container about">
    <h1 class="text-center">About</h1>
    <template v-if="!isLoading">
      <h1>User ID: {{ user.id }}</h1>
      <h1>User Name: {{ user.username }}</h1></template
    >
    <p v-else class="text-center">fetching user</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { user: null, isLoading: true };
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_URL}me`)
      .then((data) => {
        this.user = data.data;
        this.isLoading = false;
      })
      .catch((err) => console.log(err));
  },
};
</script>
