import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nextOptions from './i18nextOptions'
import i18n from './i18next.server'

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // If the request is from a bot, we want to wait for the full
  // response to render before sending it to the client. This
  // ensures that bots can see the full page content.
  if (isbot(request.headers.get("user-agent"))) {
    return serveTheBots(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
  }

  return serveBrowsers(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}

async function serveTheBots(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const instance = createInstance();
  const lng = await i18n.getLocale(request);
  const ns = i18n.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lng))
    .init({
      ...i18nextOptions,
      lng,
      ns,
    });

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </I18nextProvider>,
      {
        // Use onAllReady to wait for the entire document to be ready
        onAllReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough();
          pipe(body);
          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

async function serveBrowsers(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const instance = createInstance();
  const lng = await i18n.getLocale(request);
  const ns = i18n.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lng))
    .init({
      ...i18n,
      lng,
      ns,
    });

  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </I18nextProvider>,
      {
        // use onShellReady to wait until a suspense boundary is triggered
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough();
          pipe(body);
          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(err: unknown) {
          didError = true;
          console.error(err);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
