"""Resize supplied brand artwork without cropping. Originals remain outside the repository."""
from pathlib import Path
from PIL import Image, ImageOps
import json
repo=Path(__file__).resolve().parents[2]
source=repo.parent/'output'
out=repo/'client/public/media/branding';out.mkdir(parents=True,exist_ok=True)
roots={'hartley':source/'hartley-source/HARTLEY-library/assets','away':source/'away-source/AWAY-UPDATED/assets','sunday-boat':source/'sunday-boat-source/Sunday-Boat-Web-Designer-Handoff/03-web-images'}
selected={
'hartley':{
'collection':'photography/hartley-04-7.png','sleeve':'packaging-mockups/01-morning-pastry-sleeve.png','bag':'packaging-mockups/04-takeaway-handover.png','loyalty':'stationery-mockups/02-regulars-loyalty-card.png','menu':'print-editorial-mockups/03-afternoon-tea-menu-wide-margins.png','poster':'posters/08-a-little-time-for-tea-small-crown.png','exterior':'photography/hartley-01-2.png','dog':'illustrations/png/04-dog-standing-profile.png','botanical':'illustrations/png/34-periwinkle-complete-study.png'},
'away':{'towels':'mockup-new-5.png','label':'mockup-new-1.png','guide':'mockup-new-4.png','ceramics':'applications-4.png','amenities':'applications-6.png','welcome':'applications-0.png','key':'applications-1.png','poster':'AWAY-social-and-posters/09-the-great-outside-poster.png','social':'AWAY-social-and-posters/01-wildly-comfortable-feed.png'},
'sunday-boat':{'box':'packaging/16-refined-wrap-box-full.webp','bag':'packaging/22-takeaway-bag-pistachio-solid-full.webp','wrap':'packaging/17-wrapping-paper-full.webp','table':'tableware/27-placemat-napkin-full.webp','merch':'merchandise/29-merch-collection-full.webp','tote':'merchandise/33-merch-tote-full.webp','cap':'merchandise/32-merch-cap-full.webp','exterior':'restaurant/12-exterior-table-details-full.webp'}}
thumbs={'hartley':{'collection','bag','poster'},'away':{'towels','label','poster'},'sunday-boat':{'bag','box','merch'}}
manifest={};lines=['Supplied identity libraries. Optimized exports only; no cropping or generative edits.']
for brand,files in selected.items():
 folder=out/brand;folder.mkdir(exist_ok=True)
 for name,path in files.items():
  original=roots[brand]/path
  im=ImageOps.exif_transpose(Image.open(original));im.thumbnail((1400,1400),Image.Resampling.LANCZOS)
  if im.mode not in ('RGB','RGBA'): im=im.convert('RGBA' if 'transparency' in im.info else 'RGB')
  im.save(folder/(name+'.webp'),quality=84,method=6)
  manifest[brand+'/'+name]={'width':im.width,'height':im.height}
  if name in thumbs[brand]:
   im.thumbnail((480,480),Image.Resampling.LANCZOS); im.save(folder/(name+'-small.webp'),quality=82,method=6)
  lines.append(f'{brand}/{name}.webp <- {original.relative_to(source)}')
(out/'assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
(out/'SOURCES.txt').write_text('\n'.join(lines)+'\n')
print('Prepared',len(manifest),'images;',round(sum(p.stat().st_size for p in out.rglob('*.webp'))/1024),'KiB')
