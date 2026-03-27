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
// Source: dandwiki.com — Wild Magic Surge Table, Variant (5e Variant Rule)
//
// Structure: SURGE_TABLE[row][column]
//   row     = d100 result - 1  (0–99)
//   column  = severity from second d20 roll:
//               0 = Extreme  (d20 roll 1–3,   15%)
//               1 = Moderate (d20 roll 4–9,   30%)
//               2 = Nuisance (d20 roll 10–20, 55%)
const SURGE_TABLE = [
  /* 01 */ ["A fireball explodes with you at the center. You and each creature within 20 feet of you must make a Dexterity saving throw using your spell save DC, taking 5d6 fire damage on a failed save, or half on a successful one.", "For the next day, your skin tone changes color every 30 minutes, cycling through the colors of the rainbow.", "A puddle of grease appears where you are standing, with a 10-foot radius. You and anyone within 10 feet must make a Dexterity check at your spell save DC or fall prone."],
  /* 02 */ ["You recover all your expended spell slots.", "You are confused for 1 minute, as though affected by the confusion spell.", "You levitate 6 inches off the ground for 1 minute."],
  /* 03 */ ["You lose the ability to hear for 1 day.", "Your Strength is increased by 2 for 1 day.", "You gain tremorsense with a range of 30 feet for 1 minute."],
  /* 04 */ ["Each creature within 30 feet of you takes 1d10 necrotic damage. You regain hit points equal to the sum of damage dealt.", "A third eye appears in your forehead, giving you advantage on sight-based Wisdom (Perception) checks for 1 minute.", "You make no sounds for 1 minute and gain advantage on any Dexterity (Stealth) checks."],
  /* 05 */ ["You teleport to an alternate plane, then return to the location where you started after 1 minute.", "The next spell you cast within the next minute that does damage has its damage maximized.", "You grow a beard made of feathers, which remains until you sneeze."],
  /* 06 */ ["You transform into a large empty barrel for 1 minute, during which time you are considered petrified.", "For the next minute, you can teleport up to 20 feet as part of your movement on each of your turns.", "You can't speak for 1 minute. When you try, pink bubbles float out of your mouth."],
  /* 07 */ ["You are at the center of a darkness spell for 1 minute.", "You become intoxicated for 2d6 hours.", "You are immune to intoxication for the next 5d6 days."],
  /* 08 */ ["You are frightened by the nearest creature until the end of your next turn.", "Your Intelligence is decreased by 2 for 1 day.", "You recover your lowest-level expended spell slot."],
  /* 09 */ ["You are resistant to all damage types for 1 minute.", "Your Wisdom is increased by 2 for 1 day.", "For the next minute, you must shout when you speak."],
  /* 10 */ ["A random creature within 60 feet of you is poisoned for 1d4 hours.", "For 1 minute, any flammable item you touch that you aren't already wearing or carrying bursts into flame.", "Illusory butterflies and flower petals flutter in the air around you in a 10-foot radius for 1 minute."],
  /* 11 */ ["Make a Wisdom saving throw against your own spell save DC. If you fail, you are polymorphed into a giant dragonfly for 1 minute.", "Plants grow around you and you are restrained for 1 minute.", "You cast mirror image on yourself, which lasts for 1 minute and does not require concentration."],
  /* 12 */ ["Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.", "A random creature within 30 feet of you gains a flying speed equal to its walking speed for 1 minute.", "You are surrounded by faint, ethereal music for 1 minute."],
  /* 13 */ ["You immediately gain 20 temporary hit points.", "You may immediately take 1 additional action.", "You regain all expended sorcery points."],
  /* 14 */ ["You teleport up to 60 feet to an unoccupied space that you can see.", "If you fall within the next day, you automatically have the benefit of the feather fall spell.", "Your hair grows to double its current length over the next minute."],
  /* 15 */ ["You are the center of a silence spell for 1 minute.", "You recover 1 expended spell slot of your choice.", "Your hair falls out but grows back within 1 day."],
  /* 16 */ ["You are vulnerable to fiends for 1 hour. Such creatures gain advantage on attack rolls made against you.", "For the next spell you cast within 1 minute that does damage, the damage is minimized.", "You gain the ability to speak one additional language of your choice for 1 hour."],
  /* 17 */ ["For the next day, any time you make an ability check, roll 1d6 and subtract the result.", "You are surrounded by a spectral shield for 1 minute, giving you a +2 bonus to your AC and immunity to magic missile.", "You are invisible for 1 minute."],
  /* 18 */ ["For any spell that requires a saving throw you cast within the next minute, the target gains advantage.", "You and all creatures within 30 feet of you gain vulnerability to piercing damage for 1 minute.", "Your eyes permanently change color. A spell such as remove curse can end this effect."],
  /* 19 */ ["The next single-target spell you cast within the next minute must target one additional target.", "For 1 minute, you gain resistance to nonmagical bludgeoning, piercing, and slashing damage.", "Small birds flutter and chirp in your vicinity for 1 minute, during which time you automatically fail any Stealth check."],
  /* 20 */ ["A demon whose CR equals your level appears near you. Make a Charisma saving throw against your spell save DC. If you succeed, the demon is subservient; otherwise it is hostile. It vanishes after 1 day.", "You are protected from Elementals for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You feel the incredible urge to relieve yourself. Until you do, your Strength and Intelligence are reduced by 1. If you don't within 2 minutes, your Charisma is reduced by 4 for 1 hour."],
  /* 21 */ ["For the next minute, every creature within 60 feet that hears you speak only hears insults as if you are casting vicious mockery at 1st level.", "For the next minute, one creature of your choice gets a -2 penalty to its AC, attack rolls, and damage rolls.", "Gnats buzz around your head for 1 minute. You must make a Constitution saving throw against your own spell save DC to cast any spell."],
  /* 22 */ ["For the next day, you have advantage on the next 2d6 rolls you make where you don't already have advantage.", "You and all creatures within 30 feet of you gain vulnerability to bludgeoning damage for 1 minute.", "You are surrounded by a faint, offensive odor for 1 minute. You gain disadvantage on all Charisma checks."],
  /* 23 */ ["You are protected from Aberrations for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You emanate light in a 30-foot radius for 1 minute. Any creature within 5 feet that can see is blinded until the end of its next turn.", "For the next minute, all spells with a casting time of 1 action or 1 bonus action require 2 consecutive actions to cast."],
  /* 24 */ ["For 1 minute, a duplicate of yourself appears in the nearest open space, takes actions independently on your Initiative, but any damage it takes and spell slots it uses apply to you.", "For the next hour, you gain advantage on Charisma checks with any creature wearing black, but disadvantage with creatures wearing white.", "You have the irresistible urge to scratch an itch in the middle of your back for 1 minute. You must succeed a Constitution saving throw against your spell save DC to cast a spell until you scratch it."],
  /* 25 */ ["A loud boom emanates from you. All creatures within 15 feet take 2d8 thunder damage and must succeed on a Constitution saving throw against your spell save DC or be deafened for 1 minute.", "You are protected from Plants for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You have a momentary vision of your own death. If you fail a Wisdom saving throw at your spell DC, you are frightened for 1 minute."],
  /* 26 */ ["All creatures within 60 feet of you regain 2d8 hit points.", "Your Intelligence is increased by 2 for 1 day.", "Your Charisma is increased by 2 for 1 minute."],
  /* 27 */ ["You transform into a marble statue of yourself for 1 minute, during which time you are considered petrified.", "Within the next hour, you have advantage on the next roll you make where you don't already have advantage.", "Over the next minute, all plants within 20 feet of you grow as if affected by the plant growth spell."],
  /* 28 */ ["You are immune to disease for 1 week.", "You gain a +2 bonus to your AC for 1 minute.", "Your eyes glow red for 1 minute."],
  /* 29 */ ["You immediately drop to 0 hit points.", "For the next minute, you are in the Border Ethereal near your last location.", "Your Constitution is increased by 2 for 1 minute."],
  /* 30 */ ["Make a Wisdom saving throw against your own spell save DC. If you fail, you are transformed into a raven for 1 minute, as if by polymorph.", "For the next minute, you gain resistance to thunder and force damage.", "You add your proficiency bonus to all Charisma checks for the next hour, if you don't already."],
  /* 31 */ ["You are protected from Beasts for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "An imp appears within 30 feet of you. Make a Charisma saving throw against your spell save DC. If you succeed, the imp is subservient; otherwise hostile. It vanishes after 1 day.", "Your spell components seem rearranged. For the next hour, you must make an Intelligence check against your spell save DC to cast any spell requiring a material component."],
  /* 32 */ ["You transform into a stuffed toy resembling yourself for 1 minute, during which time you are considered petrified.", "For the next minute, you gain resistance to fire and cold damage.", "For the next minute, you have advantage on the next roll you make where you don't already have advantage."],
  /* 33 */ ["You stand at the center of a circular wall of fire with a radius of 15 feet. Any creature in the fire must make a Dexterity saving throw against your spell DC or take 5d8 fire damage. The wall remains for 1 minute.", "For the next hour, you gain advantage on Charisma checks with creatures wearing red, but disadvantage with those wearing green.", "Every creature within 15 feet takes 1 necrotic damage. You regain hit points up to the amount dealt (or gain that as temporary HP if unwounded)."],
  /* 34 */ ["Choose 1 permanent or triggered effect from this chart affecting you or someone else and remove it, even if beneficial.", "You gain the service of an arcane eye for 1 minute that does not require concentration.", "A magic mouth appears on a nearby wall. When you speak, your voice comes from the magic mouth for 1 minute."],
  /* 35 */ ["You are vulnerable to Beasts for 1 hour. Such creatures gain advantage when attacking you.", "You lose the ability to smell for 1 day.", "You can hear exceptionally well for 1 minute, gaining advantage on all Perception checks related to sound."],
  /* 36 */ ["You permanently lose the ability to smell. This can be restored with remove curse.", "You gain a -2 penalty to your AC for 1 minute.", "You lose the ability to smell for 1 hour."],
  /* 37 */ ["You are vulnerable to Celestials for 1 hour. Such creatures gain advantage when attacking you.", "You and all creatures within 30 feet of you gain vulnerability to necrotic damage for 1 minute.", "For the next day, each time you say a word with the \"s\" sound, it sounds like a hissing snake."],
  /* 38 */ ["Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a cat for 1 minute, as if by polymorph.", "You become invisible and silent for 1 minute.", "A gentle gust of wind blows outward from you. All creatures within 40 feet can feel it, but it otherwise does nothing."],
  /* 39 */ ["You are vulnerable to Plants for 1 hour. Such creatures gain advantage when attacking you.", "Your Dexterity is increased by 2 for 1 day.", "Your Dexterity is increased by 2 for 1 minute."],
  /* 40 */ ["You gain the service of an arcane eye for 1 hour that does not require concentration.", "You can detect the thoughts of 1 creature you can see within 30 feet of you for 1 minute.", "You immediately take 1d10 radiant damage."],
  /* 41 */ ["You are protected from Celestials for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "For the next minute, all melee attacks you make with a non-magical weapon gain +1 to hit and damage and are considered magical.", "One randomly-chosen non-magical item in your possession weighing 1 pound or less vanishes forever."],
  /* 42 */ ["You transform into a medium-sized potted plant for 1 minute, during which time you are considered petrified.", "Your Strength is decreased by 2 for 1 hour.", "Your Wisdom is increased by 2 for 1 minute."],
  /* 43 */ ["3d6 random gems appear near you, worth 50gp each.", "You gain freedom of movement for 1 day.", "You immediately gain 10 temporary hit points."],
  /* 44 */ ["All allies within 20 feet of you gain a +2 bonus to attack and damage rolls on any melee weapon attack within the next minute.", "Your Dexterity is decreased by 2 for 1 hour.", "3d6 silver pieces appear near you."],
  /* 45 */ ["For 2d6 days, you glow bright yellow. You have disadvantage on Stealth checks and anyone perceiving you has advantage on Perception.", "You are affected by a faerie fire spell for 1 minute. You automatically fail the saving throw.", "You regain 5 hit points per round for 1 minute."],
  /* 46 */ ["You stand at the center of a circular wall of force with a radius of 15 feet. Any creature in the wall must make a Dexterity saving throw against your spell DC or take 5d8 force damage. The wall remains for 1 minute.", "You are protected from Beasts for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "An imp appears near you. Make a Charisma saving throw against your spell save DC. If you succeed, the imp is subservient; otherwise hostile. It vanishes after 1 hour."],
  /* 47 */ ["All creatures within 20 feet of you are knocked prone.", "3d6 gold pieces appear near you.", "Your speed is increased by 10 feet for 1 minute."],
  /* 48 */ ["You are vulnerable to Aberrations for 1 hour. Such creatures gain advantage when attacking you.", "For 2d6 hours, you have a faint pink glow. Anyone perceiving you has advantage on Perception checks.", "You gain proficiency on all Strength checks for the next hour, if you don't already have it."],
  /* 49 */ ["For the next day, you are in the Border Ethereal near your last location.", "You gain the ability to breathe water for 1 day.", "Your Intelligence is increased by 2 for 1 minute."],
  /* 50 */ ["All allies within 20 feet of you gain a +2 bonus to attack and damage rolls on any ranged weapon attack within the next minute.", "You and all creatures within 30 feet of you gain vulnerability to slashing damage for 1 minute.", "One randomly-chosen non-magical item in your possession weighing 1 pound or less is duplicated."],
  /* 51 */ ["You are at the center of a 10-foot radius antimagic field that negates all magic equal to or less than your level for 1 hour and does not require concentration.", "For the next minute, light and darkness alternate around you in a 30-foot radius. Sight-based creatures gain -1 on attack rolls and Perception checks against you; you gain +1 to Stealth checks.", "Mushrooms sprout in a 5-foot radius and vanish after 1 minute. If eaten, the creature must make a Con save against your spell DC: fail = 5d6 poison damage, success = 5d6 temporary hit points."],
  /* 52 */ ["Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a wolf for 1 minute, as if by polymorph.", "All creatures within 20 feet must make a Strength saving throw against your spell save DC or be knocked prone.", "You can smell exceptionally well for 1 minute, gaining blindsight (10 ft.) and advantage on Perception checks related to odor."],
  /* 53 */ ["You are protected from Elementals for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You are protected from Undead for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "Your feet sink into the ground, making you completely immobile for 1 minute. No effect if you were not standing on the ground."],
  /* 54 */ ["All of your hair permanently falls out. Only remove curse can end this effect.", "For the next minute, you can pass through any solid, non-magical wall that is 6 or fewer inches thick.", "One random gem worth 100gp appears near you."],
  /* 55 */ ["You gain the ability to speak one new language of your choice, but lose the ability to speak one language you already know.", "You are protected from Fiends for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma save against your spell save DC.", "For the next minute, you have double vision. You have disadvantage on ranged attacks and sight-based Perception checks."],
  /* 56 */ ["A 30-foot cube hypnotic pattern appears with you at the center. All creatures within must succeed on a Wisdom saving throw or fall asleep for 1 minute or until they take damage.", "You permanently gain one 1st-level spell slot but forget one cantrip you already know. Remove curse can end this effect.", "You are surrounded by a faint, pleasant odor. You gain advantage on all Charisma checks within the next minute."],
  /* 57 */ ["You permanently forget one cantrip. Remove curse can restore your memory.", "You immediately gain 15 temporary hit points.", "You lose proficiency on all skill checks for 1 minute."],
  /* 58 */ ["You immediately take 2d10 psychic damage.", "All gold you are carrying is now silver.", "You gain freedom of movement for 1 minute."],
  /* 59 */ ["You are vulnerable to Undead for 1 hour. Such creatures gain advantage when attacking you.", "For the next minute, you gain resistance to necrotic and radiant damage.", "You gain darkvision (60 ft.) for 1 minute. If you already have darkvision, you lose it for 1 minute instead."],
  /* 60 */ ["You transform into an iron statue of yourself for 1 minute, during which time you are considered petrified.", "You are at the center of a fog cloud spell which lasts for 1 minute.", "Approximately 100 gallons of water appear over your head and those within 10 feet of you, evenly distributed."],
  /* 61 */ ["You gain an additional spell slot of your highest level for 1 week.", "Your Charisma is increased by 2 for 1 day.", "You gain a +1 to your AC for 1 minute."],
  /* 62 */ ["If you die within the next minute, you come back to life as if by the reincarnate spell.", "You and all creatures within 30 feet of you gain vulnerability to lightning damage for 1 minute.", "You fall victim to a horrible cramp in both legs, reducing your speed by 10 feet for 1 hour."],
  /* 63 */ ["You permanently gain one spell slot one level below your highest, but lose one 1st-level spell slot. Remove curse can end this effect.", "You and all creatures within 30 feet of you gain vulnerability to force damage for 1 minute.", "The next spell you cast within the next hour uses a spell slot one level lower than normal. 1st-level spells still require a slot."],
  /* 64 */ ["All creatures that can perceive you must make a Wisdom saving throw against your spell save DC or be frightened of you.", "For the next minute, any creature you touch takes 2d6 lightning damage.", "For the next hour, you are unable to read as the letters appear jumbled."],
  /* 65 */ ["You are vulnerable to Elementals for 1 hour. Such creatures gain advantage when attacking you.", "You gain blindsight with a radius of 60 feet for 1 minute.", "For the next day, everything you say must rhyme. If it doesn't, you take 1d6 psychic damage."],
  /* 66 */ ["You are protected from Fey for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You are surrounded by a horrible, noxious odor for 1 minute. Anyone within 10 feet must make a Constitution saving throw or be stunned.", "During the next hour, you may re-roll any one save, attack roll, or skill check. If you do, you must take the new result."],
  /* 67 */ ["You gain the service of an arcane sword that does not require concentration until your next short or long rest.", "Your Charisma is decreased by 2 for 1 hour.", "You grow 1d6 inches in height. You gradually return to your original height over 1 day."],
  /* 68 */ ["You permanently gain one cantrip. Remove curse can end this effect.", "You gain the service of a phantom steed for 1 day.", "You immediately take 2d4 psychic damage."],
  /* 69 */ ["All allies within 20 feet of you gain a -2 penalty to attack and damage rolls for any melee attack they make in the next minute.", "You and all creatures within 30 feet of you gain vulnerability to acid damage for 1 minute.", "For the next hour, any time you make an ability check, roll 1d4 and subtract the result."],
  /* 70 */ ["All allies within 20 feet of you heal up to 3d8 hit points.", "Your Wisdom is decreased by 2 for 1 hour.", "You gain the ability to speak with animals for 1 hour."],
  /* 71 */ ["You lose the ability to see for 1 day. You have the blinded condition during this time.", "Your speed is increased by 10 feet for 1 day.", "You gain a -1 penalty to your AC for 1 minute."],
  /* 72 */ ["You gain the service of a phantom steed for 1 week.", "You gain the ability to walk on water for 1 day.", "You gain the use of an unseen servant for 1 hour."],
  /* 73 */ ["Make a Constitution saving throw against your spell save DC. If you fail, you are stunned for 1 minute.", "You and all creatures within 30 feet of you gain vulnerability to psychic damage for 1 minute.", "The next spell you cast within the hour uses a spell slot one level higher than normal."],
  /* 74 */ ["You transform into a stone statue of yourself for 1 minute, during which time you are considered petrified.", "One creature of your choice gets a +2 bonus to all attack rolls, damage rolls, and AC for 1 minute.", "A bad joke comes to mind and until you tell it (taking an entire action), you suffer a Wisdom penalty of 1."],
  /* 75 */ ["All creatures within 20 feet of you, including you, must make a Dexterity save against your spell save DC or be affected by a faerie fire spell.", "You lose proficiency in one randomly chosen skill, tool, or weapon type for 2d6 days.", "You hear a ringing in your ears for 1 minute. Casting a spell with a verbal component requires a Constitution check against your spell save DC."],
  /* 76 */ ["Permanently increase one ability score of your choice by 1 and decrease a different one by 1. Remove curse can end this effect.", "All food and drink within 30 feet of you becomes putrid. Consuming it deals 2d6 poison damage and causes the poisoned condition for 1 hour.", "You lose 1d6×5 pounds. You gradually return to your original weight over 1 day."],
  /* 77 */ ["You gain proficiency in one tool or weapon type you don't already have for 1 day.", "All silver you are carrying is now copper.", "Your clothes become dirty and filthy. Until you can change or clean them, your Charisma is reduced by 1."],
  /* 78 */ ["Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a giant spider for 1 minute, as if by polymorph.", "You and all creatures within 30 feet of you gain vulnerability to fire damage for 1 minute.", "You gain proficiency in Wisdom checks for the next hour, if you don't already have it."],
  /* 79 */ ["Gain the sympathy effects of the antipathy/sympathy spell for 3d6 days.", "You lose proficiency in all skill rolls for 1d4 hours.", "You shrink 1d6 inches in height. You gradually return to your original height over 1 day."],
  /* 80 */ ["You are protected from Fiends for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You are protected from Fey for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "Your skin permanently darkens or lightens by one shade. Remove curse can end this effect."],
  /* 81 */ ["All allies within 20 feet of you gain a -2 penalty to attack and damage rolls for any ranged attack within the next minute.", "For the next hour, any time you make an ability check, roll 1d6 and subtract the result.", "For 1 minute, one creature of your choice within 30 feet gains a -1 penalty to attack rolls, damage rolls, and their AC."],
  /* 82 */ ["For 1 minute, any spell with a casting time of 1 action can be cast as a bonus action.", "For the next minute, you gain resistance to poison and psychic damage.", "For the next hour, any time you make an ability check, roll 1d4 and add the result."],
  /* 83 */ ["Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a giant rabbit for 1 minute, as if by polymorph.", "You're feeling lucky. For the next hour, any time you make an ability check, roll 1d6 and add the result.", "If you cast a spell with a saving throw within the next minute, the target gains disadvantage on its saving throw."],
  /* 84 */ ["The next time you cast a spell, do not roll on this chart.", "You immediately take 2d6 psychic damage.", "Your Strength is increased by 2 for 1 minute."],
  /* 85 */ ["For the next day, you gain proficiency in all skills you are not already proficient in.", "You gain proficiency in one skill of your choice that you're not already proficient in for 1 hour.", "One creature of your choice gains a +1 bonus to attack rolls, damage rolls, and its AC for 1 minute."],
  /* 86 */ ["The next time you cast a spell, roll twice on this chart. Both effects apply.", "Your Constitution is increased by 2 for 1 day.", "You immediately heal 2d10 hit points."],
  /* 87 */ ["You are vulnerable to Fey for 1 hour. Such creatures gain advantage when attacking you.", "You and all creatures within 30 feet of you gain vulnerability to thunder damage for 1 minute.", "You gain proficiency on all Intelligence checks for the next hour, if you don't already have it."],
  /* 88 */ ["You transform into an empty wooden chest for 1 minute, during which time you are considered petrified.", "You and all creatures within 30 feet of you gain vulnerability to cold damage for 1 minute.", "For the next hour, any spell you cast does not require a verbal component."],
  /* 89 */ ["Gain the antipathy effects of the antipathy/sympathy spell for 3d6 days.", "You gain the ability to speak one language of your choice for 1 day.", "You gain 1d6×10 pounds. You gradually return to your original weight over 1 day."],
  /* 90 */ ["All creatures within 30 feet of you must make a Wisdom saving throw. Those that fail (creatures immune to magical sleep auto-succeed) fall asleep for 1d6 minutes.", "You and all creatures within 30 feet of you gain vulnerability to radiant damage for 1 minute.", "You gain proficiency in all Dexterity checks for the next hour, if you don't already have it."],
  /* 91 */ ["You are protected from Plants for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You are protected from Celestials for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "Your fingernails and toenails grow uncomfortably long. Until trimmed, your Dexterity is reduced by 1 and speed reduced by 5 feet."],
  /* 92 */ ["All allies within 20 feet of you gain a +2 bonus to their AC for 1 minute.", "For the next minute, you are unable to cast any spell that causes damage.", "You gain the effects of the blur spell for 1 minute, which does not require concentration."],
  /* 93 */ ["The next time you fall below 0 hit points within the next month, you automatically fail your first death saving throw.", "You gain spider climb for 1 minute, and it does not require concentration.", "For the next hour, you appear to others to be the opposite gender."],
  /* 94 */ ["You gain two spell slots at your second-highest level for 1 week.", "You immediately lose all unspent sorcery points and may not regain them until you finish a long rest.", "You gain the service of a 2nd-level spiritual weapon for 1 minute."],
  /* 95 */ ["For the next day, any time you make an ability check, roll 1d6 and add the result.", "You and all creatures within 30 feet of you gain vulnerability to poison damage for 1 minute.", "For the next hour, any spell you cast does not require a somatic component."],
  /* 96 */ ["Make a Wisdom saving throw against your spell save DC. If you fail, you are transformed into a sheep for 1 minute, as if by polymorph.", "You gain the ability to speak with animals for 1 day.", "You gain proficiency in all Constitution checks for the next hour, if you don't already have it."],
  /* 97 */ ["All allies within 30 feet of you gain a -2 penalty to their AC for 1 minute.", "All food and drink within 30 feet of you is purified.", "Every inanimate object that isn't worn or carried within 40 feet of you becomes enshrouded with shadows for 1 minute and is considered heavily obscured."],
  /* 98 */ ["You are protected from Undead for 1 day. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "You are protected from Aberrations for 1 hour. Such creatures cannot attack you unless they succeed on a Charisma saving throw against your spell save DC.", "Your fingers become sore for 1 hour. You must succeed on a Dexterity saving throw against your spell save DC to cast any spell with a somatic component."],
  /* 99 */ ["You jump forward in time exactly 1 minute, for 1 minute. From everyone else's perspective, you cease to exist during that time.", "All your clothing and equipment teleports to the nearest open space at least 15 feet from you that you can see.", "You feel extremely nauseated. Make a Constitution saving throw against your spell save DC. If you fail, you must spend your next action throwing up."],
  /* 100 */ ["All spells you cast within the next minute automatically fail.", "Your Constitution is decreased by 2 for 1 hour.", "You immediately lose one unspent sorcery point."],
];

// =============================================================
// HOOK & CLICK HANDLER SETUP — do not edit below this line
// =============================================================

// ── CLICK HANDLER ─────────────────────────────────────────────
// Handles the "Roll d20!" button embedded in the chat prompt card.
if (game.wildMagicRollHandler) {
  document.removeEventListener("click", game.wildMagicRollHandler);
}

game.wildMagicRollHandler = async (e) => {
  const btn = e.target.closest("[data-wild-magic-roll]");
  if (!btn || btn.disabled) return;

  btn.disabled = true;
  btn.textContent = "⏳ Rolling...";

  const actor = game.actors.get(btn.dataset.actorId);
  const counter = parseInt(btn.dataset.counter);
  const messageId = btn.closest("[data-message-id]")?.dataset.messageId;

  if (!actor) return;

  // Roll d20 for the surge check and post to chat
  const surgeRoll = await new Roll("1d20").evaluate();
  await surgeRoll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: `🌀 Wild Magic Surge Check — surge on ${counter} or lower`,
  });
  const rolled = surgeRoll.total;

  // Delete the prompt card
  const promptMsg = game.messages.get(messageId);
  if (promptMsg) await promptMsg.delete();

  if (rolled <= counter) {
    // ─── SURGE! ──────────────────────────────────────────────
    await actor.setFlag("world", "wildMagicSurgeCounter", 1);

    // Roll d100 for the table row (1–100)
    const d100Roll = await new Roll("1d100").evaluate();
    const rowIndex = d100Roll.total - 1;

    // Roll d20 for severity column
    const severityRoll = await new Roll("1d20").evaluate();
    let colIndex, severity, severityColor;
    if (severityRoll.total <= 3) {
      colIndex = 0; severity = "Extreme"; severityColor = "#ff4444";
    } else if (severityRoll.total <= 9) {
      colIndex = 1; severity = "Moderate"; severityColor = "#ffaa44";
    } else {
      colIndex = 2; severity = "Nuisance"; severityColor = "#aaccff";
    }

    const surgeEffect = SURGE_TABLE[rowIndex]?.[colIndex] ?? "A strange magical effect occurs!";

    // Post d100 and severity rolls to chat
    await d100Roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `💥 Wild Magic Surge — d100 table roll`,
    });
    await severityRoll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `💥 Wild Magic Surge — severity roll (1–3 Extreme, 4–9 Moderate, 10–20 Nuisance)`,
    });

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
            <strong>Table Row:</strong> ${d100Roll.total}
            &nbsp;|&nbsp;
            <strong>Severity:</strong> <span style="color:${severityColor};">${severity}</span> (rolled ${severityRoll.total})
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
};

document.addEventListener("click", game.wildMagicRollHandler);

// ── SPELL CAST HOOK ───────────────────────────────────────────
if (game.wildMagicSurgeHookId !== undefined) {
  Hooks.off("dnd5e.preUseActivity", game.wildMagicSurgeHookId);
}

game.wildMagicSurgeHookId = Hooks.on("dnd5e.preUseActivity", async (activity, usageConfig, dialogConfig, messageConfig) => {
  const item = activity.item;
  const actor = activity.actor;

  if (!actor || actor.name !== ACTOR_NAME) return;
  if (item?.type !== "spell") return;

  const counter = (await actor.getFlag("world", "wildMagicSurgeCounter")) ?? 1;

  await ChatMessage.create({
    content: `
      <div style="
        border: 2px solid #334466;
        border-radius: 8px;
        padding: 10px;
        background: #0a0f1a;
        color: #aabbdd;
        font-family: serif;
        text-align: center;
      ">
        <h3 style="color: #7799cc; margin: 0 0 6px 0;">🌀 Wild Magic Surge Check</h3>
        <p style="margin: 0 0 10px 0;">
          <strong>${actor.name}</strong>
          &nbsp;|&nbsp;
          Surge pool: <strong>${counter}</strong> — surge on ${counter} or lower
        </p>
        <button
          data-wild-magic-roll
          data-actor-id="${actor.id}"
          data-counter="${counter}"
          style="
            background: #1a3366;
            color: #aaccff;
            border: 1px solid #4466aa;
            border-radius: 4px;
            padding: 6px 18px;
            font-size: 1em;
            cursor: pointer;
          "
        >🎲 Roll d20!</button>
      </div>
    `,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
});

ui.notifications.info(`🌀 Wild Magic Surge Tracker active for "${ACTOR_NAME}"!`);
console.log(`Wild Magic Surge | Hook registered (ID: ${game.wildMagicSurgeHookId}) for "${ACTOR_NAME}".`);
