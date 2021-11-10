import { useEffect, useReducer } from 'react'
import { query, mutate, tx } from '@onflow/fcl'

import { defaultReducer } from '../reducer/defaultReducer'
import { GET_FUSD_BALANCE } from '../flow/get-fusd-balance.script'
import { CREATE_FUSD_VAULT } from '../flow/create-fusd-vault.tx'

export default function useFUSD(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  useEffect(() => {
    getFUSDBalance();
    //eslint-disable-next-line 
  }, [])

  const getFUSDBalance = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      let vaultBalance = await query ({
        cadence: GET_FUSD_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      })
      dispatch({ type: 'SUCCESS', payload: vaultBalance })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const createFUSDVault = async () => {
    dispatch({ type: "PROCESSING" });
    try {
      let transaction = await mutate({
        cadence: CREATE_FUSD_VAULT
      })
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  return {
    ...state,
    createFUSDVault,
    getFUSDBalance
  }
}
