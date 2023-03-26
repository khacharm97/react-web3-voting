import { MutationObserverOptions, useMutation } from 'react-query';

import deleteVoter, {DeleteVoterInput, DeleteVoterOutput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";

const useDeleteVoter = (
  { accountAddress }: {
      accountAddress: string
  },
  options?: MutationObserverOptions<
    DeleteVoterOutput,
    Error,
    Omit<DeleteVoterInput, 'mainContract'>
  >,
) => {
  const mainContract = useMainContract();

  return useMutation(
    [FunctionKey.CREATE_VOTINGS, { accountAddress }],
    params =>
        deleteVoter({
          mainContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useDeleteVoter;
