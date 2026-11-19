import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CONFIG_DIR_NAME, getAgentDir, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

type ShortcutKey = Parameters<ExtensionAPI["registerShortcut"]>[0];

const DEFAULT_KEY: ShortcutKey = "ctrl+shift+s";

function configuredKey(): ShortcutKey {
	const paths = [
		join(process.cwd(), CONFIG_DIR_NAME, "simple-stash.json"),
		join(getAgentDir(), "simple-stash.json"),
	];
	for (const path of paths) {
		try {
			const { key } = JSON.parse(readFileSync(path, "utf8")) as { key?: unknown };
			if (typeof key === "string" && key.trim() !== "") {
				return key.trim() as ShortcutKey;
			}
		} catch {
			// Missing or malformed config falls through to the next source.
		}
	}
	return DEFAULT_KEY;
}

export default function (pi: ExtensionAPI) {
	let stashedPrompt: string | undefined;

	pi.registerShortcut(configuredKey(), {
		description: "Stash or restore the current prompt",
		handler: ({ ui }) => {
			const draft = ui.getEditorText();
			if (stashedPrompt !== undefined) {
				if (draft !== "") {
					ui.notify("Clear or submit the current draft before restoring the stashed prompt.", "warning");
					return;
				}
				ui.setEditorText(stashedPrompt);
				stashedPrompt = undefined;
			} else if (draft !== "") {
				stashedPrompt = draft;
				ui.setEditorText("");
			}
		},
	});
}
