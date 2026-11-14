import { constants, mkdirSync, writeFileSync } from "node:fs";
import { accessSync } from "node:fs";
import { join } from "node:path";

function assemblePoem(stanzas: readonly (readonly string[])[]): string {
  return stanzas.reduce((acc, cur, idx) => {
    const chunk = cur.join("\n");
    return idx === 0 ? chunk : `${acc}\n\n${chunk}`;
  }, "");
}

const SECTIONS: readonly (readonly string[])[] = [
  ["The Belay"],
  [
    "High on the face, you pick each flake of granite,",
    "shift heel, trust shadow, reach beyond the bolt—",
    "to anyone below, all freedom looks like climbing.",
  ],
  [
    "Down on the ledge, tied twice to cold iron,",
    "my brake hand reads the rope's small jerks and slack,",
    "feeding a foot when you stretch toward the crack:",
  ],
  [
    "too stingy, and I yank you off your stance;",
    "too generous, and rock collects the difference.",
  ],
  [
    "Between a climber and a keeper of the line,",
    "every inch paid out is an act of faith—",
    "two pairs of knuckles sharing one weight,",
    "neither whole until the anchor holds.",
  ],
];

const finalPoem = assemblePoem(SECTIONS);
const chars = [...finalPoem].length;
if (chars < 1 || chars > 1000 || !finalPoem.trim()) {
  throw new Error("Output violates character gate");
}

const outRoot = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outRoot, { recursive: true });
accessSync(outRoot, constants.W_OK);
writeFileSync(join(outRoot, "entry.txt"), finalPoem, "utf8");
