import 'edge-runtime';
import { type DefaultTreeAdapterMap, parse } from 'parse5';

import type { MetadataType } from '@/src/shared/model/metadata.ts';

function handleNode(node: DefaultTreeAdapterMap['node'], meta: Record<string, string | undefined>) {
  switch (node.nodeName) {
    case '#document':
    case 'html':
    case 'head': {
      node.childNodes.forEach(childNode => {
        handleNode(childNode, meta);
      });
      break;
    }

    case 'link': {
      const metaAttrs = node.attrs.reduce<Record<string, string>>((acc, attr) => {
        if (attr.name === 'rel' || attr.name === 'href') {
          acc[attr.name] = attr.value;
        }
        return acc;
      }, {});

      if ('rel' in metaAttrs && metaAttrs.rel === 'icon' && 'href' in metaAttrs) {
        meta.favicon = metaAttrs.href;
      }
      break;
    }

    case 'title': {
      node.childNodes.forEach(childNode => {
        if (childNode.nodeName === '#text' && 'value' in childNode) {
          meta.title = childNode.value;
        }
      });
      break;
    }

    case 'meta': {
      const metaAttrs = node.attrs.reduce<Record<string, string>>((acc, attr) => {
        if (attr.name === 'property' || attr.name === 'content') {
          acc[attr.name] = attr.value;
        }
        return acc;
      }, {});

      if ('property' in metaAttrs && 'content' in metaAttrs) {
        meta[metaAttrs.property] = metaAttrs.content;
      }

      break;
    }
  }
}

Deno.serve(async req => {
  const { url } = await req.json();
  const meta: Record<string, string | undefined> = {};

  const resp = await fetch(url, { method: 'GET' });
  if (!resp.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const htmlText = await resp.text();

    const document = parse(htmlText, {});
    handleNode(document, meta);

    const metadataResult: MetadataType = {
      url,
      title: meta.title || meta['og:title'] || meta['twitter:title'] || meta['og:site_name'],
      description: meta.description || meta['og:description'] || meta['twitter:description'],
      image: meta.image || meta['og:image'] || meta['twitter:image'],
      favicon: !meta.favicon?.startsWith('http') ? meta.favicon : new URL(meta.favicon, url).toString(),
    };

    return new Response(JSON.stringify(metadataResult), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: 'Failed to fetch URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
