import { TItemDescriptions } from 'factions/factionTypes'
import SlavesToDarknessUnits from 'factions/slaves_to_darkness/units'
import { BEASTS_OF_CHAOS } from 'meta/factions'
import { keyPicker, pickEffects } from '../metatagger'
import Artifacts from './artifacts'
import Battalions from './battalions'
import BattleTraits from './battle_traits'
import CommandAbilities from './command_abilities'
import CommandTraits from './command_traits'
import Flavors from './flavors'
import Scenery from './scenery'
import Spells from './spells'
import Units from './units'

const subFactions: TItemDescriptions = {
  [BEASTS_OF_CHAOS]: {
    effects: pickEffects(BattleTraits, ['BeastsOfChaos']),

    available: {
      artifacts: [Artifacts],
      battalions: [Battalions],
      command_abilities: [CommandAbilities],
      command_traits: [CommandTraits],
      scenery: [Scenery],
      spells: [Spells],
      units: [Units, keyPicker(SlavesToDarknessUnits, ['Chaos Spawn'])],
      flavors: [Flavors],
    },
  },
}

export default subFactions