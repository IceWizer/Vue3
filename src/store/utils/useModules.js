import store from "..";

export default function useModules(modules) {
    modules.forEach((m) => {
        if (!store.hasModule(m.store.name)) {
            store.registerModule(m.store.name, m.store);
        }
    });

    const umount = () => {
        modules.forEach(m => {
            if (store.hasModule(m.store.name)) {
                store.unregisterModule(m.store.name);
            }
        });
    };

    return { umount };
}