import { renderToString } from 'react-dom/server'
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import resourcesToBackend from "i18next-resources-to-backend";
// import arCommon from '@public/locales/ar/common.json'
// import enCommon from '@public/locales/en/common.json'
const arCommon = require('@public/locales/ar/common.json');
const enCommon = require('@public/locales/en/common.json');

import i18nextOptions from './i18nextOptions'
import i18n from './i18next.server'


const lngs  = { 
  ar : {
    common : arCommon
  },
  en : {
    common : enCommon
  }
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance()

  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request)
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces(remixContext)

  // First, we create a new instance of i18next so every request will have a
  await instance
    .use(initReactI18next) 
    .use(resourcesToBackend(lngs))  // バックエンドを適用
    .init({
      ...i18n, 
      lng, 
      ns, 
    });

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}