import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  //vite.config.ts for production build on AWS machine
  if (mode === "prod" || mode === "production") {
    return { plugins: [react()] };
  }

  //vite.config.ts for local development with proxies
  const USER_IDENTITY_TARGET = env.USER_IDENTITY_TARGET;
  const EVENT_FUNDRAISING_TARGET = env.EVENT_FUNDRAISING_TARGET;
  const BILLING_TARGET = env.BILLING_TARGET;

  console.info(`Running in mode=${mode}`);
  console.info(USER_IDENTITY_TARGET ? `User target: ${USER_IDENTITY_TARGET}` : 'No user target set');
  console.info(EVENT_FUNDRAISING_TARGET ? `Event target: ${EVENT_FUNDRAISING_TARGET}` : 'No event target set');
  console.info(BILLING_TARGET ? `Billing target: ${BILLING_TARGET}` : 'No billing target set');

  if (!USER_IDENTITY_TARGET || !EVENT_FUNDRAISING_TARGET || !BILLING_TARGET) {
    throw new Error(
      `Missing proxy targets for mode=${mode}.
        Expected:
        - USER_IDENTITY_TARGET
        - EVENT_FUNDRAISING_TARGET
        - BILLING_TARGET`
    );
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api/user': {
          target: USER_IDENTITY_TARGET,
          changeOrigin: true,
        },
        '/api/event-fundraising': {
          target: EVENT_FUNDRAISING_TARGET,
          changeOrigin: true,
        },
        '/api/billing': {
          target: BILLING_TARGET,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': r('./src'),
        '@components': r('./src/components'),
        '@api': r('./src/api'),
        '@pages': r('./src/pages'),
        '@store': r('./src/store'),
        '@styles': r('./src/styles'),
        '@utils': r('./src/utils'),
      },
    },
  };
});
