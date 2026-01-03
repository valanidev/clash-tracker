// In Game Data
export type ClashData = {
  tag: string
  timestamp: number
  helpers: ClashItem[]
  buildings: ClashItem[]
  traps: ClashItem[]
  decos: ClashItem[]
  obstacles: ClashItem[]
  units: ClashItem[]
  siege_machines: ClashItem[]
  heroes: ClashItem[]
  spells: ClashItem[]
  pets: ClashItem[]
  equipment: ClashItem[]
  house_parts: ClashItem[]
  skins: ClashItem[]
  sceneries: ClashItem[]
  buildings2: ClashItem[]
  traps2: ClashItem[]
  decos2: ClashItem[]
  obstacles2: ClashItem[]
  units2: ClashItem[]
  heroes2: ClashItem[]
  skins2: ClashItem[]
  sceneries2: ClashItem[]
  boosts: Record<string, number>
}

export type ClashItem = {
  data: number
  lvl?: number
  cnt?: number
  weapon?: number
  timer?: number
  gear_up?: number
  helper_cooldown?: number
}

// API Data
export type PlayerApiData = {
  tag: string
  name: string
  townHallLevel: number
  townHallWeaponLevel: number
  expLevel: number
  trophies: number
  bestTrophies: number
  warStars: number
  attackWins: number
  defenseWins: number
  builderHallLevel: number
  builderBaseTrophies: number
  bestBuilderBaseTrophies: number
  role: string
  warPreference: WarPreference
  donations: number
  donationsReceived: number
  clanCapitalContributions: number
  clan: Clan
  league: League
  leagueTier: League
  builderBaseLeague: BuilderBaseLeague
  achievements: Achievement[]
  playerHouse: PlayerHouse
  labels: Label[]
  troops: Unit[]
  heroes: Hero[]
  heroEquipment: HeroEquipment[]
  spells: Unit[]
}

type WarPreference = 'in' | 'out'

type Clan = {
  tag: string
  name: string
  clanLevel: number
  badgeUrls: Icons
}

type League = {
  id: number
  name: string
  iconUrls: Icons
}

type BuilderBaseLeague = {
  id: number
  name: string
}

type PlayerHouse = {
  elements: {
    type: string
    id: number
  }[]
}

type Label = {
  id: number
  name: string
  iconUrls: Icons
}

type HeroEquipment = {
  name: string
  level: number
  maxLevel: number
  village: Village
}

type Icons = {
  small: string
  medium?: string
  large?: string
  tiny?: string
}

export type Village = 'home' | 'builderBase' | 'clanCapital'

export type Achievement = {
  completionInfo: string | null
  info: string
  name: string
  stars: number
  target: number
  value: number
  village: Village
}

export type Unit = {
  name: string
  level: number
  maxLevel: number
  village: Village
}

export type Hero = Unit & {
  equipment?: HeroEquipment[]
}
