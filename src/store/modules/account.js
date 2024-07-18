import * as accountApi from '@/apis/account';

const state = {
    userInfo: {},
};

const getters = {
    userInfo: (state) => state.userInfo,
};

const actions = {
    async getUserInfo({ commit }) {
        const [err, res] = await accountApi.getUserInfo();
        if (!err) {
            commit('setUserInfo', res);
        }
    },
};

const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo = { ...userInfo };
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
