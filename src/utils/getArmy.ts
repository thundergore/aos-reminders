import { sortBy } from 'lodash'

import { TCommandTraits, TArtifacts, IArmy } from 'types/army'
import { TSupportedFaction } from 'meta/factions'
import { ORDER, DESTRUCTION, TGrandAlliances, CHAOS, DEATH } from 'meta/alliances'
import ArmyList from 'meta/army_list'

import { OrderTraits, OrderArtifacts } from 'army/order'
import { DestructionArtifacts, DestructionTraits } from 'army/destruction'
import { ChaosTraits, ChaosArtifacts } from 'army/chaos'
import { DeathArtifacts, DeathTraits } from 'army/death'
import { RealmArtifacts } from 'army/malign_sorcery'

import { processGame } from './processGame'

export const getArmy = (factionName: TSupportedFaction): IArmy => {
  const { Army, GrandAlliance } = ArmyList[factionName]
  const { Units, Battalions, Traits, Artifacts } = Army

  Army.Artifacts = modifyArtifacts(Artifacts, GrandAlliance)
  Army.Traits = modifyTraits(Traits, GrandAlliance)
  Army.Game = processGame([Units, Battalions, Army.Artifacts, Army.Traits])

  return Army as IArmy
}

type TGrandAllianceConfig = {
  [key in TGrandAlliances]: {
    Artifacts: TArtifacts
    Traits: TCommandTraits
  }
}

const GrandAllianceConfig: TGrandAllianceConfig = {
  [ORDER]: {
    Artifacts: OrderArtifacts,
    Traits: OrderTraits,
  },
  [DESTRUCTION]: {
    Artifacts: DestructionArtifacts,
    Traits: DestructionTraits,
  },
  [CHAOS]: {
    Artifacts: ChaosArtifacts,
    Traits: ChaosTraits,
  },
  [DEATH]: {
    Artifacts: DeathArtifacts,
    Traits: DeathTraits,
  },
}

/**
 * Modify Artifacts for a given Army
 * @param entry
 */
const modifyArtifacts = (artifacts: TArtifacts, alliance: TGrandAlliances): TArtifacts => {
  const { Artifacts } = GrandAllianceConfig[alliance]
  return sortBy(artifacts, 'name')
    .concat(Artifacts)
    .concat(RealmArtifacts)
}

/**
 * Modify Traits for a given Army
 * @param entry
 */
const modifyTraits = (traits: TCommandTraits, alliance: TGrandAlliances): TCommandTraits => {
  const { Traits } = GrandAllianceConfig[alliance]
  return traits.concat(Traits)
}