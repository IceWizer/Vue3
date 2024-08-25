import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, ".", '');


  if (command === "serve") {

    return {
      // vite config
      define: {
        __VITE_BASE_URL__: JSON.stringify(env.VITE_BASE_URL),
        __VITE_API_URL__: JSON.stringify(env.VITE_API_URL),
      },

      plugins: [
        vue(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        }
      },
      server: {
        host: true,
        port: 5173, // This is the port which we will use in docker
        // Thanks @sergiomoura for the window fix
        // add the next lines if you're using windows and hot reload doesn't work
        watch: {
          usePolling: true
        }
      },
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      }
    };
  } else {

    return {
      // vite config
      define: {
        __VITE_BASE_URL__: JSON.stringify(env.VITE_BASE_URL),
        __VITE_API_URL__: JSON.stringify(env.VITE_API_URL),
      },

      plugins: [
        vue(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        }
      },
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      }
    };
  }
});


// // https://vitejs.dev/config/
// export default defineConfig(({ command, mode }) => {
//   plugins: [
//     vue(),
//   ],
//     resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//         '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
//     }
//   },
//   server: {
//     host: true,
//       port: 5173, // This is the port which we will use in docker
//         // Thanks @sergiomoura for the window fix
//         // add the next lines if you're using windows and hot reload doesn't work
//         watch: {
//       usePolling: true
//     }
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       target: 'es2020',
//     },
//   },

// })
