import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const POEM: string = "The Weaver's Knot\n\nThe electric loom in town turns twenty yards an hour,\ntension monitored by laser across four thousand ends.\nIf a warp thread shears, a solenoid fires,\na nylon splice fuses beneath heat in four milliseconds,\nand the cloth rolls onward, uniform as painted tin.\n\nAt home on the countermarch loom,\nwhen the middle blue linen thread snapped tonight,\neverything stopped with a dry slap against the reed.\nNo alarm. Just the gap in the shed\nstaring up like an open eye.\n\nI took the spool of flax,\nlicked the two broken tips between my teeth,\nand tied a weaver's knot with my thumb against the heddle.\nI trimmed the tails with brass snips,\nleaving an eighth of an inch of fuzz where they crossed.\n\nThe machine makes a blanket without a seam.\nMine will have a small hard knob near the left border.\nWhen you pull the wool over your chin in the dark,\nyour finger will find that ridge in the cloth\nand know someone sat there\nand chose to mend the thread instead of throwing it away.";

function main(): void {
  const codePoints = [...POEM].length;
  if (codePoints < 1 || codePoints > 1000 || !POEM.trim()) {
    throw new Error(`Invalid poem length: ${codePoints}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), POEM, "utf-8");
}

main();
