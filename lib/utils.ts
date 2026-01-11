import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// DO NOT TOUCH, TROOPS UNLOCK LEVELS
export const BARRACKS_UNLOCKS: Record<string, number> = {
  Barbarian: 1,
  Archer: 2,
  Goblin: 3,
  Giant: 4,
  'Wall Breaker': 5,
  Balloon: 6,
  Wizard: 7,
  Healer: 8,
  Dragon: 9,
  'P.E.K.K.A': 10,
  'Baby Dragon': 11,
  Miner: 12,
  'Electro Dragon': 13,
  Yeti: 14,
  'Dragon Rider': 15,
  'Electro Titan': 16,
  'Root Rider': 17,
  Thrower: 18,
  'Meteor Golem': 19,
}
export const DARK_BARRACKS_UNLOCKS: Record<string, number> = {
  Minion: 1,
  'Hog Rider': 2,
  Valkyrie: 3,
  Golem: 4,
  Witch: 5,
  'Lava Hound': 6,
  Bowler: 7,
  'Ice Golem': 8,
  Headhunter: 9,
  'Apprentice Warden': 10,
  Druid: 11,
  Furnace: 12,
}
export const SPELL_FACTORY_UNLOCKS: Record<string, number> = {
  'Lightning Spell': 1,
  'Healing Spell': 2,
  'Rage Spell': 3,
  'Jump Spell': 4,
  'Freeze Spell': 4,
  'Clone Spell': 5,
  'Invisibility Spell': 6,
  'Recall Spell': 7,
  'Revive Spell': 8,
  'Totem Spell': 9,
}
export const DARK_SPELL_FACTORY_UNLOCKS: Record<string, number> = {
  'Poison Spell': 1,
  'Earthquake Spell': 2,
  'Haste Spell': 3,
  'Skeleton Spell': 4,
  'Bat Spell': 5,
  'Overgrowth Spell': 6,
  'Ice Block Spell': 7,
  'Totem Spell': 8,
}
export const WORKSHOP_UNLOCKS: Record<string, number> = {
  'Wall Wrecker': 1,
  'Battle Blimp': 2,
  'Stone Slammer': 3,
  'Siege Barracks': 4,
  'Log Launcher': 5,
  'Flame Flinger': 6,
  'Battle Drill': 7,
  'Troop Launcher': 8,
}
export const PET_HOUSE_UNLOCKS: Record<string, number> = {
  'L.A.S.S.I': 1,
  'Electro Owl': 2,
  'Mighty Yak': 3,
  Unicorn: 4,
  Frosty: 5,
  Diggy: 6,
  'Poison Lizard': 7,
  Phoenix: 8,
  'Spirit Fox': 9,
  'Angry Jelly': 10,
  Sneezy: 11,
}
export const BB_BARRACKS_UNLOCKS: Record<string, number> = {
  'Raged Barbarian': 1,
  'Sneaky Archer': 2,
  'Boxer Giant': 3,
  'Beta Minion': 4,
  Bomber: 5,
  'Baby Dragon': 6,
  'Cannon Cart': 7,
  'Night Witch': 8,
  'Drop Ship': 9,
  'Power P.E.K.K.A': 10,
  'Hog Glider': 11,
  'Electrofire Wizard': 12,
}
