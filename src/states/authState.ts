import { atom } from 'recoil'
import { ModifiedUser } from '../util/types'

export const authenticatedData = atom<ModifiedUser | null>({
  key: 'auth-data',
  default: null,
})
