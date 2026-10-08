import { afterEach, describe, expect, it, vi } from 'vitest';
import { readPreviewSource, safePreviewReturnPath, previewIndustry } from '../client/src/lib/previewNavigation';

function browser(state: unknown = null, path = '/he/templates/') {
  const url = new URL(path, 'https://dm-labs.io');
  vi.stubGlobal('window', {location:url,history:{state}});
}
afterEach(()=>vi.unstubAllGlobals());
describe('example return navigation',()=>{
  it('keeps the source language, query, and fragment',()=>{
    browser();
    expect(safePreviewReturnPath('/he/templates/?industry=beauty#examples')).toBe('/he/templates/?industry=beauty#examples');
  });
  it.each([null,'https://evil.test','//evil.test','/\\evil.test','/preview/nomad-coffee/'])('uses a local gallery fallback for unsafe or recursive return %s',path=>{
    browser();expect(safePreviewReturnPath(path)).toBe('/templates/');
  });
  it('only restores the history entry matching the current page',()=>{
    const source={url:'/he/templates/',x:0,y:1800,href:'/preview/bella-salon/',top:150,industry:'beauty'};
    browser({dmPreviewSource:source});expect(readPreviewSource()).toEqual(source);expect(previewIndustry()).toBe('beauty');
    browser({dmPreviewSource:source},'/');expect(readPreviewSource()).toBeNull();expect(previewIndustry()).toBe('all');
  });
  it('ignores invalid stored coordinates',()=>{
    browser({dmPreviewSource:{url:'/he/templates/',x:0,y:'1800',top:0,href:'/preview/bella-salon/'}});
    expect(readPreviewSource()).toBeNull();
  });
});
