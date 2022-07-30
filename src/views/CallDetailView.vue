<template>
  <div class="container">
    <h1 class="text-center">Call Detail</h1>
    <template v-if="!isLoading">
      <p>Call ID: {{ call.id }}</p>
      <p>Call Duration: {{ Math.floor(call.duration / 60) }} minutes</p>
      <p>Call Type: {{ call.call_type }}</p>
      <p>Direction: {{ call.direction }}</p>
      <p>Archived: {{ call.is_archived ? "Yes" : "No" }}</p>
      <p>From: {{ call.from }}</p>
      <p>To: {{ call.to }}</p>
      <p>Via: {{ call.via }}</p>
      <p>Time: {{ call.created_at }}</p>

      <h5>
        Call Notes: {{ call.notes.length > 0 ? "" : "No notes to show!!!" }}
      </h5>
      <ul v-if="call.notes.length > 0">
        <li v-for="note in call.notes" :key="note.id">{{ note.content }}</li>
      </ul>
      <div class="d-flex flex-row w-50 justify-content-between">
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Note</button
        ><button
          type="button"
          class="btn"
          :class="{
            'btn-danger': call.is_archived,
            'btn-success': !call.is_archived,
          }"
          @click="archive"
        >
          {{ call.is_archived ? "Remove Archive" : "Add Archive" }}
        </button>
      </div>
    </template>
    <p v-else class="text-center">Fetching call</p>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="note">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Note</h5>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <input
                type="text"
                v-model="content"
                class="form-control"
                id="content"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Pusher from "pusher-js";
export default {
  props: ["id"],
  data() {
    return {
      call: null,
      isLoading: true,
      content: "",
    };
  },
  methods: {
    archive() {
      axios
        .put(`${process.env.VUE_APP_BASE_URL}calls/${this.id}/archive`)
        .then((data) => {
          this.call = data.data;
        });

      //   const pusher = new Pusher(
      //     process.env.VUE_APP_APP_KEY,
      //     {
      //       userAuthentication: {
      //         endpoint: process.env.VUE_APP_APP_AUTH_ENDPOINT,
      //       },
      //     },
      //     { cluster: process.env.VUE_APP_APP_CLUSTER }
      //   );
      //   console.log("pusher", pusher);

      //   var pusher = new Pusher(process.env.VUE_APP_APP_KEY, {
      //     userAuthentication: { endpoint: process.env.VUE_APP_APP_AUTH_ENDPOINT },
      //     cluster: process.env.VUE_APP_APP_CLUSTER,
      //   });

      //   .then(() => this.$router.go());
    },
    note() {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}calls/${this.id}/note`, {
          content: this.content,
        })
        .then((data) => {
          this.call = data.data;
          this.content = "";
        });
    },
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_URL}calls/${this.id}`)
      .then((data) => {
        this.call = data.data;
        this.isLoading = false;
      })
      .catch((err) => console.log(err));
  },
};
</script>
