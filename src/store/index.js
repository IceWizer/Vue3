import Vuex from 'vuex'

import authStore from './modules/authStore'
import appStore from './modules/app'
import personStore from './modules/personStore'

export default new Vuex.Store({
    modules: {
        app_store: appStore,
        auth_store: authStore,
        [personStore.name]: personStore.store
    },
})
