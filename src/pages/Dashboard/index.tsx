import React, {useState} from 'react';
import useGetVotings from "../../client/api/queries/getVotings/useGetVotings";
import web3 from 'web3';
import {Button, FileInput, Modal, Label, Radio, Spinner} from "flowbite-react/lib/esm/components";
import useIsVotedVoter from "../../client/api/mutations/isVoted/useGetVotings";
import {useWeb3React} from "@web3-react/core";
import useGetOptions from "../../client/api/queries/getOptions/useGetOptions";
import useVote from "../../client/api/mutations/Voting/useAddVoter";

const Dashboard = () => {
    const {account} = useWeb3React();
    const [name, setName] = useState<string>();
    const [vote, setVote] = useState<string>();
    const {isSuccess, data: votings} = useGetVotings({});
    const {data: options} = useGetOptions({votingName: name || ''}, { enabled: !!name });
    const {mutateAsync: isVoted} = useIsVotedVoter({accountAddress: account || ''})
    const {mutateAsync: voteFunc , isLoading: loadingVote} = useVote({accountAddress: account || ''})
    const [openModal, setOpenModal] = useState<boolean>(false);
    const onClose = () => {
        setOpenModal(false)
    }
    const voting = (name: string) => {
        setName(name);
        setOpenModal(true);
    }
    const checkIsVoted = (name: string) =>{
        if (!account) return true;
        // return isVoted({accountAddress: account, votingName: name})
    }
    const handleForVoter = (vote: string) => {
        setVote(vote);
    }
    const handleVote = () => {
        console.log(account, name, vote)
        voteFunc({accountAddress: account || '', votingName: name || '', voterFor: vote || ''}).then(()=> {
            onClose()
            setVote('')
            setName('')
        })
    }

    return (
        <div className={"flex flex-col px-4"}>
            <h3 className={'text-2xl'}>Voting</h3>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium border-slate-300">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-4">#</th>
                                    <th scope="col" className="text-center px-6 py-4">Name</th>
                                    <th scope="col" className="text-center px-6 py-4">Description</th>
                                    <th scope="col" className="text-center px-6 py-4">Group</th>
                                    <th scope="col" className="text-center px-6 py-4">End Time</th>
                                    <th scope="col" className="text-center px-6 py-4">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {isSuccess ? votings.data.map((el, i) => {
                                    return (
                                        <tr className="border-b border-slate-300 transition duration-300 ease-in-out hover:bg-neutral-200"
                                            key={i}>
                                            <td className="whitespace-nowrap text-center px-6 py-4 font-medium">{i + 1}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">{web3.utils.toUtf8(el.name)}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">{web3.utils.toUtf8(el.description)}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">{el.group}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">
                                                {(new Date(+el.endTime * 1000)).getDate()}/
                                                {(new Date(+el.endTime * 1000)).getMonth()}/
                                                {(new Date(+el.endTime * 1000)).getFullYear()}
                                            </td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">
                                                <Button
                                                    className={"mx-auto"}
                                                    gradientMonochrome="info"
                                                    onClick={() => voting(el.name)}
                                                >
                                                    View more
                                                </Button>
                                            </td>
                                        </tr>)
                                }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <React.Fragment>
                <Modal
                    dismissible={true}
                    show={openModal}
                    onClose={onClose}
                >
                    <Modal.Header>
                        {name ? web3.utils.toUtf8(name) : null}
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset
                            className="flex flex-col gap-4"
                            id="radio"
                        >
                            <legend>
                                Choose your favorite Voter
                            </legend>
                            {options?.map((option, i) => <div className="flex items-center gap-2" key={i}>
                                <Radio
                                    id={option + i}
                                    name={'forVoter'}
                                    value={option}
                                    defaultChecked={false}
                                    onClick={() => handleForVoter(option)}
                                />
                                <Label htmlFor={option + i}>
                                    {web3.utils.toUtf8(option)}
                                </Label>
                            </div>)}
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            gradientMonochrome="success"
                            disabled={!(account && name && vote) || loadingVote}
                            onClick={handleVote}
                        >
                            {loadingVote ?<div className="mr-3">
                                 <Spinner
                                    size="sm"
                                    light={true}
                                />
                            </div>: null}
                            Vote
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default Dashboard;
