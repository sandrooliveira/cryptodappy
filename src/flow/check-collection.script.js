export const CHECK_COLLECTION = `
  import DappyContract from 0xDappy

  pub fun main (addr: Address): Bool {
    return getAccount(addr).getCapability<&{DappyContract.CollectionPublic}>(DappyContract.CollectionPublicPath).check()
  }
`;