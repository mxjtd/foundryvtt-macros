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
- Prompts the player with a chat card containing a **Roll d20!** button; the roll posts publicly with full dice animation
- On a surge: rolls d100 for the table row, then d20 for severity, and posts a result card with the effect text
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

## Surge Table

Uses the **Variant Wild Magic Surge Table** from D&D Wiki:

> [Wild Magic Surge Table, Variant (5e Variant Rule)](https://dandwiki.com/wiki/Wild_Magic_Surge_Table,_Variant_(5e_Variant_Rule))

The table has **100 rows** and **3 severity columns**. On a surge:

1. Roll **d100** — determines the table row (the specific effect category)
2. Roll **d20** — determines the severity of that effect:

| d20 Roll | Severity | Probability |
|----------|----------|-------------|
| 1–3 | **Extreme** | 15% |
| 4–14 | **Moderate** | 55% |
| 15–20 | **Nuisance** | 30% |

To swap in a different table, edit the `SURGE_TABLE` array near the top of `wild-magic-surge-setup.js`. Each entry is `[extreme, moderate, nuisance]`.

---

## Compatibility

- **System:** dnd5e 5.x (FoundryVTT v13+)
- Uses the `dnd5e.preUseActivity` hook from the activity system introduced in dnd5e 4.x
- `Roll.evaluate()` called without options — always async in FoundryVTT v13

---

## Chat output

**No surge:**
> 🌀 **Wild Magic Surge Check**
> Fezzini The Magnificent | Pool: 3 | Rolled: 14 — Safe!
> Surge pool grows to **4**.

**Surge:**
> 💥 **WILD MAGIC SURGE!**
> Fezzini The Magnificent has surged!
> Surge Pool: 4 | Rolled: 2 ≤ 4 — SURGE!
> Table Row: 83 | Severity: **Moderate** (rolled 9)
> *You're feeling lucky. For the next hour, any time you make an ability check, roll 1d6 and add the result.*
> Surge pool reset to **1**.
