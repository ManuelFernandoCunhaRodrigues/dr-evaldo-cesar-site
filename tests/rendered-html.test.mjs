import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a landing page médica com conteúdo essencial", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="pt-BR"/i);
  assert.match(html, /<title>Otorrino em São Luís \| Dr\. Evaldo César Macau<\/title>/i);
  assert.match(html, /Cuidado especializado para a saúde do/);
  assert.match(html, /CRM-MA 10415/);
  assert.match(html, /RQE 3698/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /FAQPage/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem ipsum/i);
});

test("mantém uma única heading principal e links funcionais", async () => {
  const html = await (await render()).text();
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /https:\/\/wa\.me\/?\?text=/i);
  assert.match(html, /https:\/\/www\.google\.com\/maps\/search/i);
  assert.doesNotMatch(html, /href="#"/i);
});
