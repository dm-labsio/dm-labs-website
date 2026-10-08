"""Retrieve the pinned CC0 sources used by the shared house builder."""
from pathlib import Path
import hashlib, json, subprocess
root = Path(__file__).resolve().parents[2]
out = root.parent / 'output/website-refresh/arcos/materials'
out.mkdir(parents=True, exist_ok=True)
for asset in json.loads(Path(__file__).with_name('sources.json').read_text()):
    path = out / asset['file']
    if not path.exists() or hashlib.sha256(path.read_bytes()).hexdigest() != asset['sha256']:
        subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location', asset['url'], '--output', str(path)], check=True)
    assert hashlib.sha256(path.read_bytes()).hexdigest() == asset['sha256'], f"Changed source: {path.name}"
    print(path.name)
