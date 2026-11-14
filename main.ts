import * as fs from "node:fs";
import * as path from "node:path";

function composeEntry(): string {
  const blocks: string[][] = [
  [
    "Recurring Cart"
  ],
  [
    "Every Friday at nine the grocery bot",
    "restocked the kitchen we used to share:",
    "two trout fillets, a pint of cream,",
    "the almond biscuits she always ate stale.",
    "For four months after the funeral",
    "I never changed a single line.",
    "Throwing half the fridge out on Wednesdays",
    "was cheaper than opening the edit button."
  ],
  [
    "This morning the confirmation pinged:",
    "Same order as last week?"
  ],
  [
    "My thumb stayed over Confirm—",
    "one tap to keep Tuesday mornings looking full.",
    "Instead I canceled the subscription,",
    "put on my coat, and took a noisy metal cart",
    "down aisle four myself—",
    "choosing one onion, one small loaf,",
    "one life I had been putting off",
    "for four months."
  ]
];
  return blocks.map((b) => b.join("\n")).join("\n\n");
}

function emitEntry(): void {
  const text = composeEntry();
  const cp = Array.from(text).length;
  if (cp === 0 || cp > 1000 || text.trim().length === 0) {
    throw new Error("Poem gate invariant failed");
  }
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(targetDir, { recursive: true });
  const fd = fs.openSync(path.join(targetDir, "entry.txt"), "w");
  try {
    fs.writeSync(fd, text, 0, "utf8");
  } finally {
    fs.closeSync(fd);
  }
}

emitEntry();
