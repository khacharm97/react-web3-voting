import type { TransactionReceipt } from 'web3-core';
import {Main} from "../../../../types/contracts";

export interface DeleteVoterInput {
  mainContract: Main;
  accountAddress: string;
  voterAddress: string;
}

export type DeleteVoterOutput = TransactionReceipt;

const deleteVoter = ({
  mainContract,
  accountAddress,
  voterAddress
}: DeleteVoterInput): Promise<DeleteVoterOutput> => {
  console.log(voterAddress,'111')
  return mainContract.methods.removeVoter(voterAddress).send({from: accountAddress});
}
export default deleteVoter;
