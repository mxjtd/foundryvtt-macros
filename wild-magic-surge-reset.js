// =============================================================
// WILD MAGIC SURGE TRACKER — Reset Counter
// Save as: Type: Script | Name: "Wild Magic Surge — Reset"
//
// Run this after a long rest (or any time you need to reset
// the surge pool back to 1).
// =============================================================

// Must match the name in the Setup macro exactly
const ACTOR_NAME = "Character Name Here";

// =============================================================

const actor = game.actors.getName(ACTOR_NAME);

if (!actor) {
  ui.notifications.error(`Wild Magic Surge | Actor "${ACTOR_NAME}" not found. Check the name spelling.`);
} else {
  const current = (await actor.getFlag("world", "wildMagicSurgeCounter")) ?? 1;
  await actor.setFlag("world", "wildMagicSurgeCounter", 1);

  ui.notifications.info(`Wild Magic surge pool reset: ${current} → 1 for "${ACTOR_NAME}".`);

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
          🌀 Wild Magic Surge Pool Reset
        </h3>
        <p style="margin: 4px 0;">
          <strong>${actor.name}</strong>'s surge pool has been reset to <strong>1</strong>.
        </p>
      </div>
    `,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
}
