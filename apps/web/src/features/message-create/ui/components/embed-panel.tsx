import { useEffect, useRef } from 'react';
import { useTabsContext } from '@chakra-ui/react';
import { type EmbedState, EmbedType } from '@message-app/entities/messages';
import { FaImage, FaLink, FaVideo, FaYoutube } from 'react-icons/fa6';

import { EmbedImages } from './embed-images';
import { EmbedSite } from './embed-site';
import { EmbedTabsContent, EmbedTabsTrigger } from './embed-tabs';
import { EmbedVideo } from './embed-video';
import { EmbedYoutube } from './embed-youtube';

export function EmbedPanel() {
  return (
    <>
      <EmbedTabsTrigger value={EmbedType.IMAGES}>
        <FaImage />
      </EmbedTabsTrigger>
      <EmbedTabsTrigger value={EmbedType.VIDEOS}>
        <FaVideo />
      </EmbedTabsTrigger>
      <EmbedTabsTrigger value={EmbedType.SITE}>
        <FaLink />
      </EmbedTabsTrigger>
      <EmbedTabsTrigger value={EmbedType.YOUTUBE}>
        <FaYoutube />
      </EmbedTabsTrigger>
    </>
  );
}

export function EmbedPanelContent({ onChange }: { onChange: (embed: EmbedState) => void }) {
  const { value } = useTabsContext();
  const embedStateRef = useRef<Partial<Record<EmbedType, EmbedState>>>({
    null: { type: EmbedType.NULL },
  });

  useEffect(() => {
    if (!value) return void onChange({ type: 'null' });

    const currentState = embedStateRef.current[value as EmbedType];
    if (currentState) return void onChange(currentState);

    onChange({ type: 'null' });
  }, [value, onChange]);

  function handleEmbedStateChange(embedState: EmbedState) {
    embedStateRef.current[embedState.type] = embedState;
    onChange(embedState);
  }

  return (
    <>
      <EmbedTabsContent value={EmbedType.IMAGES}>
        <EmbedImages onFileAccept={images => handleEmbedStateChange({ type: EmbedType.IMAGES, images })} />
      </EmbedTabsContent>
      <EmbedTabsContent value={EmbedType.VIDEOS}>
        <EmbedVideo onFileAccept={video => handleEmbedStateChange({ type: EmbedType.VIDEOS, video })} />
      </EmbedTabsContent>
      <EmbedTabsContent value={EmbedType.SITE}>
        <EmbedSite onChange={url => handleEmbedStateChange({ type: EmbedType.SITE, url })} />
      </EmbedTabsContent>
      <EmbedTabsContent value={EmbedType.YOUTUBE}>
        <EmbedYoutube onChange={videoId => handleEmbedStateChange({ type: EmbedType.YOUTUBE, videoId })} />
      </EmbedTabsContent>
    </>
  );
}
