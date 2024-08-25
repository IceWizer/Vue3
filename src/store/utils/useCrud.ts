import crudBase from "./crud";
import type { CrudBaseStore } from "./types";

export default (modelName: string): { name: string, store: CrudBaseStore } => {
    const store = crudBase(modelName);

    return {
        name: store.name,
        store: store
    }
}
