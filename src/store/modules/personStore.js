import { useCrud } from "@store/utils";

const model = "people";

const { name, store } = useCrud(model);

export default {
    name: name,
    store: store,
}
