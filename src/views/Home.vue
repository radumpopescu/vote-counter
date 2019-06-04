<template>
  <div class="home">
    <div class="columns">
      <div v-for="i in members" class="column">
        <button class="button" @click="addVote(i)">Membru {{ i }}</button>

        <div class="is-size-5">
          <span class="has-text-weight-bold">Total {{ numberOfVotes(i) }}</span>
        </div>

        <div class="is-size-7">
          <timeago
            v-if="lastVote(i)"
            :datetime="`${lastVote(i)['date']}+2:00`"
            :auto-update="60"
          ></timeago>
        </div>

        <button
          v-if="lastVote(i)"
          class="button is-small"
          @click="removeLastVote(i)"
        >
          Sterge ultimul vot
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      members: 5
    };
  },
  mounted() {
    this.$store.dispatch("init");
  },
  computed: {
    ...mapGetters(["lastVote", "numberOfVotes"])
  },
  methods: {
    addVote(member) {
      this.$store.dispatch("addVote", member);
    },

    removeLastVote(member) {
      this.$store.dispatch("removeLastVote", member);
    }
  }
};
</script>
