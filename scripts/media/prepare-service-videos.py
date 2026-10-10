"""Create versioned web clips and matching first-frame posters. Originals stay intact."""
from pathlib import Path
import subprocess, hashlib, json, concurrent.futures
ROOT = Path(__file__).resolve().parents[2]
FFMPEG = '/private/tmp/dm-labs-video-tools/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
OUT = ROOT / 'client/public/media/brand-refresh/v3'
SOURCES = [('custom-design', 'Create_a_d_3970'), ('mobile-first', 'Create_a_d_3940'), ('seo', 'the_magnif_3968'), ('performance', 'technology_3978'), ('security', 'product_re_3995'), ('turnaround', 'energetic__4075')]
def prepare(item):
    slug, suffix = item
    source = Path('/Users/anastacia/Downloads') / f'kling_20261010_VIDEO_{suffix}_0.mp4'
    temp = OUT / f'service-{slug}-working.mp4'
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-i', str(source), '-map', '0:v:0', '-an', '-vf', 'scale=960:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', str(temp)], check=True)
    digest = hashlib.sha256(temp.read_bytes()).hexdigest()[:10]
    clip = OUT / f'service-{slug}-{digest}.mp4'
    temp.rename(clip)
    poster = OUT / f'service-{slug}-{digest}.webp'
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-i', str(clip), '-frames:v', '1', '-c:v', 'libwebp', '-quality', '88', '-y', str(poster)], check=True)
    return dict(service=slug,source=source.name,video='/'+str(clip.relative_to(ROOT/'client/public')),poster='/'+str(poster.relative_to(ROOT/'client/public')),originalBytes=source.stat().st_size,webBytes=clip.stat().st_size,width=960,height=542)
if __name__ == '__main__':
    OUT.mkdir(parents=True,exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        items=list(pool.map(prepare,SOURCES))
    report=ROOT/'docs/brand-refresh/service-videos-v3.json'
    report.write_text(json.dumps(items,indent=2)+'\n')
    print(json.dumps(items,indent=2))
