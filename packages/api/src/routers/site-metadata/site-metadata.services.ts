import { TRPCError } from '@trpc/server';
import { type DefaultTreeAdapterMap, parse } from 'parse5';

export interface GetMetadataResponse {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
}

export async function getMetadata({ url }: { url: string }) {
  const meta: Record<string, string | undefined> = {};

  const resp = await fetch(url, { method: 'GET' }).catch(() => null);
  if (!resp?.ok) {
    throw new TRPCError({
      message: 'Failed to connect to the site. Try again later or use a different url.',
      code: 'SERVICE_UNAVAILABLE',
    });
  }

  const htmlText = await resp.text();

  try {
    const document = parse(htmlText, {});
    handleNode(document, meta);

    const metadataResult: GetMetadataResponse = {
      url,
      title: meta.title || meta['og:title'] || meta['twitter:title'] || meta['og:site_name'],
      description: meta.description || meta['og:description'] || meta['twitter:description'],
      image: getUrl(url, meta.image || meta['og:image'] || meta['twitter:image']),
      favicon: getUrl(url, meta.favicon),
    };

    return metadataResult;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      message: 'Failed to connect to the site. Try again later or use a different url.',
      code: 'SERVICE_UNAVAILABLE',
    });
  }
}

function getUrl(base: string, url?: string | null) {
  if (!url) return;
  if (url.startsWith('http')) return url;
  return new URL(url, base).toString();
}

function handleNode(node: DefaultTreeAdapterMap['node'], meta: Record<string, string | undefined>) {
  switch (node.nodeName) {
    case '#document':
    case 'html':
    case 'head': {
      for (const childNode of node.childNodes) {
        handleNode(childNode, meta);
      }
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
      for (const childNode of node.childNodes) {
        if (childNode.nodeName === '#text' && 'value' in childNode) {
          meta.title = childNode.value;
        }
      }
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
