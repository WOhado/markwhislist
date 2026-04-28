from pathlib import Path
path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')
lines = text.splitlines()
new_lines = []
last_id = None
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('id:'):
        parts = stripped.split(':', 1)[1].strip()
        if parts.endswith(','):
            parts = parts[:-1]
        last_id = parts.strip("'\"")
    new_lines.append(line)
    if stripped.startswith('heroImage:') and last_id is not None:
        next_index = i + 1
        if next_index < len(lines) and 'downloadLink:' in lines[next_index]:
            continue
        new_lines.append(f"    downloadLink: '/downloads/{last_id}.zip',")
path.write_text('\n'.join(new_lines), encoding='utf-8')
