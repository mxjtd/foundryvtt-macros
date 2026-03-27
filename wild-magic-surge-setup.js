// =============================================================
// WILD MAGIC SURGE TRACKER — Setup Macro
// Save as: Type: Script | Name: "Wild Magic Surge — Setup"
//
// Run this once per session (or after any page refresh) to
// activate automatic surge checking on spell casts.
//
// COMPATIBILITY: dnd5e 5.x (FoundryVTT v13+)
// =============================================================

// ── CONFIGURATION ────────────────────────────────────────────
// Change this to match the Wild Magic character's exact name.
const ACTOR_NAME = "Character Name Here";
// ─────────────────────────────────────────────────────────────

// ── SURGE TABLE ───────────────────────────────────────────────
// Standard 5e d100 Wild Magic Surge table (50 paired entries).
// Index 0 = roll 01–02, Index 1 = roll 03–04, etc.
// Edit any entry to customize for your campaign!
const SURGE_TABLE = [
  /* 01–02 */ "Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.",
  /* 03–04 */ "For the next minute, you can see any invisible creature if you have line of sight to it.",
  /* 05–06 */ "A modron chosen and controlled by the GM appears in an unoccupied space within 5 feet of you, then disappears 1 minute later.",
  /* 07–08 */ "You cast Fireball as a 3rd-level spell centered on yourself.",
  /* 09–10 */ "You cast Magic Missile as a 5th-level spell.",
  /* 11–12 */ "Roll a d10. Your height changes by a number of inches equal to the roll. If the roll is odd, you shrink. If even, you grow.",
  /* 13–14 */ "You cast Confusion centered on yourself.",
  /* 15–16 */ "For the next minute, you regain 5 hit points at the start of each of your turns.",
  /* 17–18 */ "You grow a long beard made of feathers that remains until you sneeze, at which point the feathers explode from your face.",
  /* 19–20 */ "You cast Grease centered on yourself.",
  /* 21–22 */ "Creatures have disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.",
  /* 23–24 */ "Your skin turns a vibrant shade of blue. A Remove Curse spell can end this effect.",
  /* 25–26 */ "An eye appears on your forehead for the next minute. During that time, you have advantage on Wisdom (Perception) checks that rely on sight.",
  /* 27–28 */ "For the next minute, all your spells with a casting time of 1 action have a casting time of 1 bonus action.",
  /* 29–30 */ "You teleport up to 60 feet to an unoccupied space of your choice that you can see.",
  /* 31–32 */ "You are transported to the Astral Plane until the end of your next turn, after which time you return to the space you previously occupied or the nearest unoccupied space if that space is occupied.",
  /* 33–34 */ "Maximize the damage of the next damaging spell you cast within the next minute.",
  /* 35–36 */ "Roll a d10. Your age changes by a number of years equal to the roll. If the roll is odd, you get younger (minimum 1 year old). If even, you get older.",
  /* 37–38 */ "1d6 flumphs controlled by the GM appear in unoccupied spaces within 60 feet of you and are frightened of you. They vanish after 1 minute.",
  /* 39–40 */ "You regain 2d10 hit points.",
  /* 41–42 */ "You turn into a potted plant until the start of your next turn. While a plant, you are incapacitated and have vulnerability to all damage. If you drop to 0 hit points, your pot breaks, and your form reverts.",
  /* 43–44 */ "For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.",
  /* 45–46 */ "You cast Levitate on yourself.",
  /* 47–48 */ "A unicorn controlled by the GM appears in a space within 5 feet of you, then disappears 1 minute later.",
  /* 49–50 */ "You can't speak for the next minute. Whenever you try, pink bubbles float out of your mouth.",
  /* 51–52 */ "A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to Magic Missile.",
  /* 53–54 */ "You are immune to being intoxicated by alcohol for the next 5d6 days.",
  /* 55–56 */ "Your hair falls out but grows back within 24 hours.",
  /* 57–58 */ "For the next minute, any flammable object you touch that isn't being worn or carried by someone else bursts into flame.",
  /* 59–60 */ "You regain your lowest-level expended spell slot.",
  /* 61–62 */ "For the next minute, you must shout when you speak.",
  /* 63–64 */ "You cast Fog Cloud centered on yourself.",
  /* 65–66 */ "Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.",
  /* 67–68 */ "You are frightened by the nearest creature until the end of your next turn.",
  /* 69–70 */ "Each creature within 30 feet of you becomes invisible for the next minute. The invisibility ends on a creature when it attacks or casts a spell.",
  /* 71–72 */ "You gain resistance to all damage for the next minute.",
  /* 73–74 */ "A random creature within 60 feet of you becomes poisoned for 1d4 hours.",
  /* 75–76 */ "You glow with bright light in a 30-foot radius for the next minute. Any creature that ends its turn within 5 feet of you is blinded until the end of its next turn.",
  /* 77–78 */ "You cast Polymorph on yourself. If you fail the saving throw, you turn into a sheep for the spell's duration.",
  /* 79–80 */ "Illusory butterflies and flower petals flutter in the air within 10 feet of you for the next minute.",
  /* 81–82 */ "You can take one additional action immediately.",
  /* 83–84 */ "Each creature within 30 feet of you takes 1d10 necrotic damage. You regain hit points equal to the sum of the necrotic damage dealt.",
  /* 85–86 */ "You cast Mirror Image.",
  /* 87–88 */ "You cast Fly on a random creature within 60 feet of you.",
  /* 89–90 */ "You become invisible for the next minute. During that time, other creatures can't hear you. The invisibility ends if you attack or cast a spell.",
  /* 91–92 */ "If you die within the next minute, you immediately come back to life as if by the Reincarnate spell.",
  /* 93–94 */ "Your size increases by one size category for the next minute.",
  /* 95–96 */ "You and all creatures within 30 feet of you gain vulnerability to piercing damage for the next minute.",
  /* 97–98 */ "You are surrounded by faint, ethereal music for the next minute.",
  /* 99–00 */ "You regain all expended spell slots.",
];

// =============================================================
// HOOK SETUP — do not edit below this line
// =============================================================

// Remove any previously registered hook to prevent duplicates
// (safe to re-run this macro each session)
if (game.wildMagicSurgeHookId !== undefined) {
  Hooks.off("dnd5e.postUseActivity", game.wildMagicSurgeHookId);
  console.log("Wild Magic Surge | Removed previous hook.");
}

// dnd5e 5.x (FoundryVTT v13): uses the activity system.
// Hook fires after any activity is used; we filter to Cast activities on spells.
game.wildMagicSurgeHookId = Hooks.on("dnd5e.postUseActivity", async (activity, usageConfig, results) => {
  const item = activity.item;
  const actor = activity.actor;

  // Debug: log every activity use so we can confirm the hook is firing
  console.log(`Wild Magic Surge | Hook fired — actor: "${actor?.name}", item type: "${item?.type}", activity type: "${activity?.type}"`);

  // Only fire for the configured actor
  if (!actor || actor.name !== ACTOR_NAME) return;

  // Only fire for spells — item.type covers all spell levels including cantrips.
  // We don't filter by activity.type because spells use many activity types
  // (save, attack, heal, utility, etc.) depending on the spell.
  if (item?.type !== "spell") return;

  // Read the current surge pool counter (defaults to 1 if never set)
  const counter = (await actor.getFlag("world", "wildMagicSurgeCounter")) ?? 1;

  // Roll d20 for the surge check (evaluate() is always async in v13)
  const d20Roll = await new Roll("1d20").evaluate();
  const rolled = d20Roll.total;

  if (rolled <= counter) {
    // ─── SURGE! ──────────────────────────────────────────────
    await actor.setFlag("world", "wildMagicSurgeCounter", 1);

    // Roll d100 and look up the effect
    const d100Roll = await new Roll("1d100").evaluate();
    const tableIndex = Math.ceil(d100Roll.total / 2) - 1;
    const surgeEffect = SURGE_TABLE[tableIndex] ?? "A strange magical effect occurs!";
    const rollRange = `${tableIndex * 2 + 1}–${tableIndex * 2 + 2}`;

    await ChatMessage.create({
      content: `
        <div style="
          border: 2px solid #8b0000;
          border-radius: 8px;
          padding: 12px;
          background: #1a0000;
          color: #ffcccc;
          font-family: serif;
        ">
          <h2 style="color: #ff4444; text-align: center; margin: 0 0 6px 0;">
            💥 WILD MAGIC SURGE!
          </h2>
          <p style="text-align: center; margin: 0 0 8px 0; color: #ffaaaa;">
            <strong>${actor.name}</strong> has surged!
          </p>
          <hr style="border-color: #8b0000; margin: 6px 0;">
          <p style="margin: 4px 0;">
            <strong>Surge Pool:</strong> ${counter}
            &nbsp;|&nbsp;
            <strong>Rolled:</strong> ${rolled} ≤ ${counter} — <span style="color:#ff4444;">SURGE!</span>
          </p>
          <p style="margin: 4px 0;">
            <strong>d100 Result:</strong> ${d100Roll.total} (${rollRange})
          </p>
          <hr style="border-color: #8b0000; margin: 6px 0;">
          <p style="margin: 4px 0; font-style: italic;">${surgeEffect}</p>
          <p style="margin: 10px 0 0 0; font-size: 0.85em; color: #886666;">
            Surge pool reset to <strong>1</strong>.
          </p>
        </div>
      `,
      speaker: ChatMessage.getSpeaker({ actor }),
    });

  } else {
    // ─── No surge — pool grows ────────────────────────────────
    const newCounter = counter + 1;
    await actor.setFlag("world", "wildMagicSurgeCounter", newCounter);

    await ChatMessage.create({
      content: `
        <div style="
          border: 2px solid #334466;
          border-radius: 8px;
          padding: 10px;
          background: #0a0f1a;
          color: #aabbdd;
          font-family: serif;
        ">
          <h3 style="color: #7799cc; text-align: center; margin: 0 0 6px 0;">
            🌀 Wild Magic Surge Check
          </h3>
          <p style="margin: 4px 0;">
            <strong>${actor.name}</strong>
            &nbsp;|&nbsp;
            <strong>Pool:</strong> ${counter}
            &nbsp;|&nbsp;
            <strong>Rolled:</strong> ${rolled} — <span style="color:#88cc88;">Safe!</span>
          </p>
          <p style="margin: 4px 0; color: #8899bb;">
            Surge pool grows to <strong>${newCounter}</strong>.
          </p>
        </div>
      `,
      speaker: ChatMessage.getSpeaker({ actor }),
    });
  }
});

ui.notifications.info(`🌀 Wild Magic Surge Tracker active for "${ACTOR_NAME}"!`);
console.log(`Wild Magic Surge | Hook registered (ID: ${game.wildMagicSurgeHookId}) for "${ACTOR_NAME}".`);
