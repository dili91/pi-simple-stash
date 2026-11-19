# pi-simple-stash

A single-slot prompt stash for Pi, the way Claude Code's Ctrl+S stash works.

Press **Ctrl+Shift+S** with a draft to stash it and clear the editor. Press it again while the editor is empty to get the prompt back, unsent. Your stash survives sending messages; it is cleared by a session switch, `/reload`, or exit. It holds text only.

Ctrl+Shift+S only reaches Pi as a distinct key when the terminal reports modifiers separately (Kitty keyboard protocol or xterm `modifyOtherKeys`). In a legacy terminal it arrives as plain Ctrl+S and nothing happens. Pick another key with the configuration below, or bind it to a function key.

## Install

```sh
pi install git:github.com/dili91/pi-simple-stash
```

Once the package is on npm, `pi install npm:pi-simple-stash` installs the same extension; update either source with `pi update --extensions`.

Run `/reload`, then press the shortcut on a draft and watch the editor clear.

Or copy the file directly, which skips package updates:

```sh
mkdir -p ~/.pi/agent/extensions
cp simple-stash.ts ~/.pi/agent/extensions/
```

## Configuration

Set the `key` in a JSON file, project first then user:

- `<project>/.pi/simple-stash.json`
- `~/.pi/agent/simple-stash.json`

```json
{ "key": "ctrl+q" }
```

The value uses Pi's key syntax (`ctrl+q`, `ctrl+alt+k`, `f2`, ...). Pi reads it when the extension loads, so run `/reload` after editing. Anything unreadable in the file, or a missing `key`, falls back to the default.

## Try it

From this directory:

```sh
pi -e ./simple-stash.ts
```

## Notes

- With a stash already held and another draft in the editor, the shortcut warns and leaves both alone. Send or clear the draft first.
- No dependencies or build step; Pi loads the TypeScript directly.
