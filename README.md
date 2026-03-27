# FoundryVTT Macros

A collection of Script Macros for FoundryVTT. Currently featuring a Wild Magic Surge tracker for D&D 5e.

---

## Wild Magic Surge Tracker

Automates a **building surge pool** mechanic for Wild Magic characters in the **dnd5e** system.

### How the mechanic works

- The surge pool starts at a threshold of **1**
- Every time the character casts a spell (including cantrips), they roll a **d20**
- If the roll is **≤ the current threshold** → **Wild Magic Surge!** Pool resets to 1
- If the roll is **> the threshold** → Safe, pool threshold increases by 1
- The tension builds the longer they go without surging

### Features

- Auto-triggers on every spell cast — no manual rolls needed
- Rolls d20 and posts the result publicly in chat
- On a surge: rolls d100, looks up the effect from the full standard 5e Wild Magic Surge table, and posts a dramatic chat card
- Surge counter persists across sessions (stored as an actor flag)
- Duplicate-safe: re-running the setup macro won't register multiple hooks
- Includes a separate reset macro for use after long rests

### Files

| File | Description |
|------|-------------|
| `wild-magic-surge-setup.js` | Run once per session to activate auto-detection |
| `wild-magic-surge-reset.js` | Resets the surge pool to 1 (use after long rests) |

---

## Installation

### 1. Add the macros to FoundryVTT

For each `.js` file:

1. Open the **Macro Directory** in Foundry (hotbar folder icon or the Macros sidebar tab)
2. Click **Create Macro**
3. Set **Type: Script**
4. Paste the full contents of the file
5. Name it and save

Suggested names:
- `Wild Magic Surge — Setup`
- `Wild Magic Surge — Reset`

### 2. Set the character name

In **both** macros, update this line near the top to match the character's exact name in Foundry:

```js
const ACTOR_NAME = "Character Name Here";
```

### 3. Activate each session

Run **Wild Magic Surge — Setup** once after loading the world. A notification will confirm it's active. The hook fires automatically on every spell cast until the page is reloaded.

### 4. After a long rest

Run **Wild Magic Surge — Reset** to drop the pool back to 1.

---

## Customizing the surge table

The full 50-entry surge table lives as a `SURGE_TABLE` array near the top of `wild-magic-surge-setup.js`. Each entry is a plain string — edit any of them to fit your homebrew.

---

## Compatibility

- **System:** dnd5e 3.x (FoundryVTT v11 / v12)
- **dnd5e 4.x+ note:** If the hook stops firing (due to the activity system introduced in 4.x), see the comment at the bottom of `wild-magic-surge-setup.js` for the one-line fix.

---

## Chat output

**No surge:**
> 🌀 **Wild Magic Surge Check**
> Thorin | Pool: 3 | Rolled: 14 — Safe!
> Surge pool grows to **4**.

**Surge:**
> 💥 **WILD MAGIC SURGE!**
> Thorin has surged!
> Surge Pool: 4 | Rolled: 2 ≤ 4 — SURGE!
> d100 Result: 41 (81–82)
> *You can take one additional action immediately.*
> Surge pool reset to **1**.
