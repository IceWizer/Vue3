export default ({
    state: {
        window: {
            width: 0,
            height: 0,
            smallWidth: 1200,
        }
    },
    mutations: {
        setWidth(state: any, width: number) { state.window.width = width },
        setHeight(state: any, height: number) { state.window.height = height },
        setSmallWidth(state: any, smallWidth: number) { state.window.smallWidth = smallWidth },
    },
    actions: {
        setWidth({ commit }: any, width: number) { commit('setWidth', width) },
        setHeight({ commit }: any, height: number) { commit('setHeight', height) },
        setSmallWidth({ commit }: any, smallWidth: number) { commit('setSmallWidth', smallWidth) },
    },
    getters: {
        getWidth: (state: { window: { width: number; height: number; smallWidth: number; }; }) => state.window.width,
        getHeight: (state: { window: { width: number; height: number; smallWidth: number; }; }) => state.window.height,
        getSmallWidth: (state: { window: { width: number; height: number; smallWidth: number; }; }) => state.window.smallWidth,
        isSmall: (state: { window: { width: number; height: number; smallWidth: number; }; }) => state.window.width < state.window.smallWidth,
    },
    namespaced: true,
})
