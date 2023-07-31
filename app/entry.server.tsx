import { renderToNodeStream } from 'react-dom/server';
import { RemixServer } from "@remix-run/react";
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import { resolve } from 'path';
import i18nextOptions from './i18nextOptions';
import i18n from './i18next.server';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance();

  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request);
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces({ url: request.url });

  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state.
  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18nextOptions, // use the same configuration as on the client side.
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render want to use
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      }
    });

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToNodeStream(
    <I18nextProvider i18n={instance}>
      <RemixServer context={{}} url={request.url} />
    </I18nextProvider>
  );

  const headers = new Headers({
    "Content-Type": "text/html; charset=UTF-8",
  });

  return new Response(markup, {
    status: 200,
    headers,
  });
}
