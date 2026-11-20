# pi-simple-stash

[![npm](https://img.shields.io/npm/v/pi-simple-stash)](https://www.npmjs.com/package/pi-simple-stash)
[![license](https://img.shields.io/npm/l/pi-simple-stash)](LICENSE)

A single-slot prompt stash for [Pi](https://pi.dev): set the draft you are writing aside, clear the editor, and bring it back later. One prompt, one slot, no list — the behaviour of Claude Code's `Ctrl+S` stash.

## Install

```sh
pi install npm:pi-simple-stash
```

Run `/reload`, or restart Pi. From source instead:

```sh
pi install git:github.com/dili91/pi-simple-stash
```

Update either source with `pi update --extensions`.

## Use

| Press | Editor state | Result |
|---|---|---|
| Ctrl+Shift+S | draft | draft is held, editor clears |
| Ctrl+Shift+S | empty | held draft comes back, unsent |
| Ctrl+Shift+S | draft, stash held | warning, both left alone |

The stash survives sending messages. It lives in memory, so a session switch, `/reload`, or exit clears it. Text only.

## Configuration

The shortcut defaults to Ctrl+Shift+S. Override it with a `key` in JSON, project first, then user:

- `<project>/.pi/simple-stash.json`
- `~/.pi/agent/simple-stash.json`

```json
{ "key": "ctrl+q" }
```

The value uses Pi's key syntax (`ctrl+q`, `ctrl+alt+k`, `f2`). Pi reads it when the extension loads, so run `/reload` after editing. A missing file, unreadable JSON, or absent `key` falls back to the default.

Ctrl+Shift+S needs a terminal that reports modifiers separately (Kitty keyboard protocol or xterm `modifyOtherKeys`). On a legacy terminal it arrives as plain Ctrl+S and does nothing — configure another key, such as `ctrl+q`.

## How it works

[`simple-stash.ts`](simple-stash.ts) is one file with no dependencies. It registers a single Pi shortcut that reads the editor text and swaps it with an in-memory slot. Pi loads the TypeScript directly.

## Development

Try a local checkout without installing anything:

```sh
pi -e ./simple-stash.ts
```

## Links

- Repository: [github.com/dili91/pi-simple-stash](https://github.com/dili91/pi-simple-stash)
- Issues: [github.com/dili91/pi-simple-stash/issues](https://github.com/dili91/pi-simple-stash/issues)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- License: [MIT](LICENSE)
