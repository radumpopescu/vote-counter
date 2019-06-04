import Vue from "vue";
import Vuex from "vuex";
import request from "request";

Vue.use(Vuex);

const ENDPOINT = "/be.php";

const getters = {
  lastVote(state) {
    return member => {
      const votes = state.votes.filter(v => v.member == member);

      return votes.pop();
    };
  },

  numberOfVotes(state) {
    return member => {
      const votes = state.votes.filter(v => v.member == member);

      return votes.length;
    };
  }
};

const actions = {
  init({ commit }) {
    request(ENDPOINT, function(error, response, body) {
      if (!body) {
        console.error("BE error");
        return;
      }
      const votes = JSON.parse(body);
      commit("setVotes", votes);
    });
  },

  addVote({ commit }, member) {
    request(ENDPOINT + "?add=1&member=" + member, function(
      error,
      response,
      body
    ) {
      if (!body) {
        console.error("BE error");
        return;
      }
      const vote = JSON.parse(body);
      commit("addVote", vote);
    });
  },

  removeLastVote({ getters, commit }, member) {
    const voteId = getters.lastVote(member)["id"];
    request(ENDPOINT + "?remove=1&id=" + voteId, function(
      error,
      response,
      body
    ) {
      if (!body) {
        console.error("BE error");
        return;
      }
      commit("removeVote", voteId);
    });
  }
};

const mutations = {
  setVotes(state, votes) {
    state.votes = votes;
  },

  addVote(state, vote) {
    state.votes.push(vote);
  },

  removeVote(state, voteId) {
    const votes = state.votes.filter(v => v.id != voteId);
    Vue.set(state, "votes", votes);
  }
};

export default new Vuex.Store({
  state: {
    votes: []
  },
  getters,
  mutations,
  actions
});
