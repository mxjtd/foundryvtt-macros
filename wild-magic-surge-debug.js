// =============================================================
// WILD MAGIC SURGE — Hook Diagnostic
// Temporary macro to find which hook fires on spell cast.
// Run this, cast a spell, then check the browser console (F12).
// Delete this macro once you find the right hook name.
// =============================================================

const HOOKS_TO_TEST = [
  "dnd5e.postUseActivity",
  "dnd5e.preUseActivity",
  "dnd5e.useItem",
  "dnd5e.preUseItem",
  "dnd5e.rollDamage",
  "dnd5e.postRollDamage",
  "dnd5e.rollAttack",
  "createChatMessage",
];

// Clean up any previous diagnostic hooks
if (game.wildMagicDebugHooks) {
  game.wildMagicDebugHooks.forEach(({ name, id }) => Hooks.off(name, id));
  console.log("Wild Magic Debug | Cleared previous diagnostic hooks.");
}

game.wildMagicDebugHooks = HOOKS_TO_TEST.map(hookName => {
  const id = Hooks.on(hookName, (...args) => {
    const first = args[0];
    const label = first?.constructor?.name ?? typeof first;
    console.log(`✅ FIRED: ${hookName} | first arg type: ${label}`);
  });
  return { name: hookName, id };
});

ui.notifications.info("Wild Magic Debug | Listening on " + HOOKS_TO_TEST.length + " hooks. Cast a spell and check the console.");
console.log("Wild Magic Debug | Registered diagnostic hooks:", HOOKS_TO_TEST);
