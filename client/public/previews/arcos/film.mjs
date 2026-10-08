const media = '/media/examples/arcos/film-v1/';
export function prepareTour() {} // Fetch media only after the visitor opens the tour.
export function mountTour(dialog, isCurrent) {
  const video = dialog.querySelector('#journey-video');
  const stage = dialog.querySelector('#tour-stage');
  const play = dialog.querySelector('#film-play');
  const progress = dialog.querySelector('#film-progress');
  const time = dialog.querySelector('#film-time');
  const fullscreen = dialog.querySelector('#film-fullscreen');
  const loading = dialog.querySelector('#tour-loading');
  const retry = dialog.querySelector('#retry-tour');
  const events = new AbortController();
  const on = (el, name, fn, options = {}) => el.addEventListener(name, fn, { ...options, signal: events.signal });
  let disposed = false, ready = false, pointer = null, pending = null;
  const clock = n => `0:${String(Math.floor(n || 0)).padStart(2, '0')}`;
  const current = () => !disposed && isCurrent();
  function update() {
    if (!current()) return;
    progress.value = String(Math.round(video.currentTime / (video.duration || 1) * 1000));
    progress.setAttribute('aria-valuetext', `${clock(video.currentTime)} of ${clock(video.duration)}`);
    time.textContent = `${clock(video.currentTime)} / ${clock(video.duration)}`;
    play.textContent = video.ended ? 'Replay' : video.paused ? 'Play' : 'Pause';
  }
  async function toggle() {
    if (!ready || !current()) return;
    if (!video.paused) video.pause();
    else {
      if (video.ended) video.currentTime = 0;
      try { await video.play(); } catch { /* A second tap can satisfy browser playback policy. */ }
    }
    update();
  }
  function seek(seconds) {
    if (!ready) return;
    video.pause();
    pending = Math.max(0, Math.min(video.duration - 0.04, seconds));
    if (!video.seeking) { video.currentTime = pending; pending = null; }
  }
  on(video, 'seeked', () => {
    if (pending !== null) { video.currentTime = pending; pending = null; }
    update();
  });
  const timer = setTimeout(fail, 30000);
  function fail() {
    if (!current()) return;
    clearTimeout(timer);
    ready = false;
    play.disabled = progress.disabled = true;
    stage.setAttribute('aria-busy', 'false');
    loading.hidden = false;
    loading.querySelector('span').textContent = 'The film could not load. Please try again.';
    retry.hidden = false;
  }
  on(video, 'error', fail);
  on(video, 'loadeddata', () => {
    if (!current() || ready) return;
    clearTimeout(timer);
    ready = true;
    play.disabled = progress.disabled = false;
    loading.hidden = true;
    stage.setAttribute('aria-busy', 'false');
    dialog.dataset.tourReady = 'true';
    update();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) toggle();
  });
  for (const event of ['timeupdate', 'play', 'pause', 'ended']) on(video, event, update);
  on(play, 'click', toggle);
  on(progress, 'input', () => seek(Number(progress.value) / 1000 * video.duration));
  on(video, 'pointerdown', e => {
    if (!ready || video.controls || e.button !== 0) return;
    pointer = { id: e.pointerId, x: e.clientX, start: video.currentTime, moved: false };
    video.setPointerCapture(e.pointerId);
  });
  on(video, 'pointermove', e => {
    if (!pointer || pointer.id !== e.pointerId) return;
    const delta = e.clientX - pointer.x;
    if (Math.abs(delta) > 7) pointer.moved = true;
    if (pointer.moved) seek(pointer.start + delta / video.clientWidth * video.duration);
  });
  on(video, 'pointerup', e => {
    if (!pointer || pointer.id !== e.pointerId) return;
    if (!pointer.moved) toggle();
    pointer = null;
  });
  on(video, 'pointercancel', () => { pointer = null; });
  on(video, 'keydown', e => {
    if (video.controls) return;
    if ([' ', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) e.preventDefault();
    if (e.key === ' ' || e.key === 'Enter') toggle();
    if (e.key === 'ArrowLeft') seek(video.currentTime - 1);
    if (e.key === 'ArrowRight') seek(video.currentTime + 1);
    if (e.key === 'Home') seek(0);
    if (e.key === 'End') seek(video.duration);
  });
  fullscreen.hidden = !(video.requestFullscreen || video.webkitEnterFullscreen);
  on(fullscreen, 'click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (video.requestFullscreen) { video.controls = true; await video.requestFullscreen(); }
      else video.webkitEnterFullscreen();
    } catch { video.controls = false; }
  });
  on(document, 'fullscreenchange', () => { video.controls = document.fullscreenElement === video; });
  on(document, 'visibilitychange', () => { if (document.hidden) video.pause(); });
  dialog.dataset.engine = 'film';
  dialog.dataset.tourReady = 'false';
  play.disabled = progress.disabled = true;
  stage.setAttribute('aria-busy', 'true');
  video.src = media + (matchMedia('(max-width:700px)').matches || navigator.connection?.saveData ? 'walk-720.mp4' : 'walk-1080.mp4');
  video.load();
  return () => {
    disposed = true;
    clearTimeout(timer);
    events.abort();
    if (document.fullscreenElement === video) document.exitFullscreen().catch(() => {});
    video.pause();
    video.controls = false;
    video.removeAttribute('src');
    video.load();
    dialog.dataset.tourReady = 'false';
  };
}
