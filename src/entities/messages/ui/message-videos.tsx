import { useSupabase } from '@/shared/lib/supabase';

export function MessageVideos({ videos }: { videos?: string[] }) {
  const video = videos ? videos[0] : null;
  const supabase = useSupabase();

  if (!video) return null;
  return (
    <div>
      <video
        src={supabase.storage.from('message_videos').getPublicUrl(video).data.publicUrl}
        width="100%"
        height={300}
        controls
      />
    </div>
  );
}
