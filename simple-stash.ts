import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	let stashedPrompt: string | undefined;

	pi.registerShortcut("ctrl+shift+s", {
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
