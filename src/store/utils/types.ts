interface CrudBaseState {
    [x: string]: any;
    items: [];
    item: {};
    pagination: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
}

interface CrudBaseMutations {
    [x: string]: (state: any, payload: any) => void;
    SET_ITEMS: (state: any, payload: any) => void;
    SET_ITEM: (state: any, payload: any) => void;
}

interface CrudBaseActions {
    [x: string]: (context: any, payload: any) => Promise<unknown>;
    fetchItems: (context: any, payload: any) => Promise<unknown>;
    fetchItem: (context: any, payload: any) => Promise<unknown>;
    createItem: (context: any, payload: any) => Promise<unknown>;
    updateItem: (context: any, payload: any) => Promise<unknown>;
    deleteItem: (context: any, payload: any) => Promise<unknown>;
}

interface CrudBaseGetters {
    [x: string]: (state: any) => any;
    getItems: (state: any) => [];
    getItem: (state: any) => {};
    getPagination: (state: any) => {};
}

interface CrudBaseStore {
    name: string;
    namespaced: boolean;
    state: CrudBaseState;
    mutations: CrudBaseMutations;
    actions: CrudBaseActions;
    getters: CrudBaseGetters;
}

export type {
    CrudBaseState,
    CrudBaseMutations,
    CrudBaseActions,
    CrudBaseGetters,
    CrudBaseStore
}