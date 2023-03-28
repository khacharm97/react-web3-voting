import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import useGetRole from "../../client/api/queries/getRole/useGetRole";
import useCreateVoting from "../../client/api/mutations/createVoting/useCreateVoting";
import useAddVoter from "../../client/api/mutations/addVoter/useAddVoter";
import useModifyVoter from "../../client/api/mutations/modifyVoter/useModifyVoter";
import useDeleteVoter from "../../client/api/mutations/deleteVoter/useDeleteVoter";
import {Button, Label, TextInput} from "flowbite-react/lib/esm/components";

const Voting = () => {
    const {account} = useWeb3React();
    const navigate = useNavigate();
    const {isSuccess, data: access} = useGetRole({
        accountAddress: account || ''
    }, {enabled: !!account})

    const [creatingVoting, setCreatingVoting] = useState({
        name: '',
        duration: '',
        options: '',
        description: '',
        group: '',
    });
    const [addVoter, setAddVoter] = useState({
        address: '',
        group: '',
    });
    const [modifyVoter, setModifyVoter] = useState({
        address: '',
        group: '',
    });
    const [deleteVoter, setDeleteVoter] = useState('');

    const { mutateAsync: createVotingAsync } = useCreateVoting({
        accountAddress: account || ''
    });
    const { mutateAsync: addVoterAsync } = useAddVoter({
        accountAddress: account || ''
    });
    const { mutateAsync: modifyVoterAsync } = useModifyVoter({
        accountAddress: account || ''
    });
    const { mutateAsync: deleteVoterAsync } = useDeleteVoter({
        accountAddress: account || ''
    });

    useEffect(() => {
        if (!access) {
            navigate('/');
        }
    }, [isSuccess, access])

    const handelChangeCreateVoting = (event: any, type: string) => {
        setCreatingVoting(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeAddVoting = (event: any, type: string) => {
        setAddVoter(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeModifyVoting = (event: any, type: string) => {
        setModifyVoter(prevState => {
            const newDate = {
                [type]:  event.target.value
            };
            return {...prevState, ...newDate}
        })
    }
    const handelChangeDeleteVoting = (event: any) => {
        setDeleteVoter(event.target.value)
    }
    const handelCreateVoting = async () => {
        const res = await createVotingAsync({
            name: creatingVoting.name,
            optionsData: creatingVoting.options,
            duration: creatingVoting.duration,
            description: creatingVoting.description,
            group: creatingVoting.group,
            accountAddress: account || ''
        })
        console.log(res,'----')
    }
    const handelAddVoter = async () => {
        const res = await addVoterAsync({
            voterAddress: addVoter.address,
            group: addVoter.group,
            accountAddress: account || ''
        })
        setAddVoter({
            address: '',
            group: ''
        })
        console.log(res,'----')
    }
    const handelModifyVoter = async () => {
        const res = await modifyVoterAsync({
            voterAddress: modifyVoter.address,
            group: modifyVoter.group,
            accountAddress: account || ''
        })
        setModifyVoter({
            address: '',
            group: ''
        })
        console.log(res,'----')
    }
    const handelDeleteVoter = async () => {
        const res = await deleteVoterAsync({
            voterAddress: deleteVoter,
            accountAddress: account || ''
        })
        setDeleteVoter('')
        console.log(res,'----')
    }

    return (
        <div className={"flex flex-col px-4"}>
            <div className={'grid grid-rows-2 grid-flow-col gap-4'}>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Create Voting</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingName"
                                        value="Name"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingName"
                                    placeholder="Name"
                                    value={creatingVoting.name || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'name');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingDuration"
                                        value="Duration"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingDuration"
                                    placeholder="Duration"
                                    value={creatingVoting.duration || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'duration');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingOption"
                                        value="Options"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingOption"
                                    placeholder="Options"
                                    value={creatingVoting.options || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'options');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="votingDescription"
                                        value="Description"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="votingDescription"
                                    placeholder="Description"
                                    value={creatingVoting.description || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'description');
                                    }}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="groupVoting"
                                        value="Group"
                                    />
                                </div>
                                <TextInput
                                    type="number"
                                    id="groupVoting"
                                    placeholder="Group"
                                    value={creatingVoting.group || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'group');
                                    }}
                                />
                            </div>
                            <div>
                                <Button gradientMonochrome="success"
                                        disabled={!(creatingVoting.name && creatingVoting.options && creatingVoting.duration && creatingVoting.group && creatingVoting.duration)}
                                        onClick={handelCreateVoting}
                                        className={'w-full'}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Add Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="addVoter"
                                        value="Voter"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="addVoter"
                                    placeholder="Voter"
                                    value={addVoter.address || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="addVoterGroup"
                                        value="Group"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="addVoterGroup"
                                    placeholder="Group"
                                    value={addVoter.group || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <Button
                                    gradientMonochrome="success"
                                    className={'w-full'}
                                    onClick={handelAddVoter}
                                    disabled={!(addVoter.group && addVoter.address)}
                                >
                                    Add Voter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Modify Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="relative mb-3" data-te-input-wrapper-init="">
                            <div className={'mb-2'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="modifyVoter"
                                        value="Voter"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="modifyVoter"
                                    placeholder="Voter"
                                    value={modifyVoter.address || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-4'}>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="modifyNewVoter"
                                        value="New Group"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="modifyNewVoter"
                                    placeholder="New Group"
                                    value={modifyVoter.group || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <Button
                                    gradientMonochrome="success"
                                    className={'w-full'}
                                    onClick={handelModifyVoter}
                                    disabled={!(modifyVoter.group && modifyVoter.address)}
                                >
                                    Change Group
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Remove Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                       <div className="relative mb-3" data-te-input-wrapper-init="">
                                <div className={'mb-4'}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="removeVoter"
                                            value="Voter"
                                        />
                                    </div>
                                    <TextInput
                                        type="text"
                                        id="removeVoter"
                                        placeholder="Voter"
                                        value={deleteVoter || ''}
                                        onChange={(e:any) => handelChangeDeleteVoting(e)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        color="failure"
                                        className={'w-full'}
                                        onClick={handelDeleteVoter}
                                        disabled={!deleteVoter}
                                    >
                                        Remove Voter
                                    </Button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Voting;
