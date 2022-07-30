<template>
  <div class="container text-center justify-center">
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
      <h2>All Calls</h2>
      <button class="btn btn-success" @click="groupCalls">
        Group Calls by Date
      </button>
      <CallCard v-for="call in calls" :key="call.id" :call="call" />
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <router-link
            id="page-prev"
            class="page-link"
            :to="{ name: 'dashboard', query: { offset: offset - 3 } }"
            rel="prev"
            v-if="offset != 0"
            >&#60; Previous</router-link
          >
        </li>

        <li class="page-item">
          <router-link
            class="page-link"
            id="page-next"
            :to="{ name: 'dashboard', query: { offset: offset + 3 } }"
            rel="next"
            v-if="hasNext"
            >Next &#62;</router-link
          >
        </li>
      </ul>
    </template>
    <p v-else>Loading calls</p>
  </div>
</template>

<script>
import axios from "axios";
import { watchEffect } from "vue";
import CallCard from "../components/CallCard";

export default {
  components: { CallCard },
  props: ["offset"],

  data() {
    return {
      isLoading: true,
      calls: [],
      hasNext: false,
    };
  },
  methods: {
    groupCalls() {
      this.calls.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    },
  },
  created() {
    watchEffect(() => {
      this.calls = null;

      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}calls?offset=${this.offset}&limit=3`
        )
        .then((data) => {
          this.calls = data.data.nodes;
          this.isLoading = false;
          this.hasNext = data.data.hasNextPage;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    });
  },
};
</script>
<style scoped>
.navigation {
  width: 20em;
  justify-content: center;
}
</style>
