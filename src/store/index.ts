import appStore from './modules/app'
import authStore from './modules/authStore'

import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  count: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    app_store: appStore,
    auth_store: authStore,
  }
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}