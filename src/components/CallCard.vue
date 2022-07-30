<template>
  <router-link
    class="text-decoration-none text-muted"
    :to="{ name: 'call-detail', params: { id: call.id } }"
  >
    <div class="call-card">
      <p>From: {{ call.from }}</p>
      <p>To: {{ call.to }}</p>
      <h4>{{ call.call_type }}</h4>
      <p>Date: {{ call.created_at }}</p>
    </div></router-link
  >
</template>

<script>
export default {
  name: "CallCard",
  props: {
    call: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.call-card {
  width: 20em;
  margin: 1em auto 1em auto;
  padding: 1em;
  border: solid 1px #2c3e50;
  cursor: pointer;
  transition: all 0.2s linear;
}
.call-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.call-card h4 {
  font-size: 1.4em;
  margin-top: 0.5em;
  margin-bottom: 0.3em;
}
</style>
