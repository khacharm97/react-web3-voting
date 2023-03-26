import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import useGetRole from "../../client/api/queries/getRole/useGetRole";
import useCreateVoting from "../../client/api/mutations/createVoting/useCreateVoting";
import useAddVoter from "../../client/api/mutations/addVoter/useAddVoter";
import useModifyVoter from "../../client/api/mutations/modifyVoter/useModifyVoter";
import useDeleteVoter from "../../client/api/mutations/deleteVoter/useDeleteVoter";

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
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Name
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Name"
                                    value={creatingVoting.name || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'name');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Duration
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Duration"
                                    value={creatingVoting.duration || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'duration');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Options
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Options"
                                    value={creatingVoting.options || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'options');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Description
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Description"
                                    value={creatingVoting.description || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'description');
                                    }}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Group
                                </label>
                                <input
                                    type="number"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Group"
                                    value={creatingVoting.group || ''}
                                    onChange={(e: any) => {
                                        handelChangeCreateVoting(e, 'group');
                                    }}
                                />
                            </div>
                            <div>
                                <button className={'rounded-md bg-green-500 px-3 py-1.5'}
                                        disabled={!(creatingVoting.name && creatingVoting.options && creatingVoting.duration && creatingVoting.group && creatingVoting.duration)}
                                        onClick={handelCreateVoting}
                                >
                                    Create
                                </button>
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
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Voter
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Voter"
                                    value={addVoter.address || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Group
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Group"
                                    value={addVoter.group || ''}
                                    onChange={(e:any) => handelChangeAddVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <button className={'rounded-md bg-green-500 px-3 py-1.5'} onClick={handelAddVoter}>
                                    Add Voter
                                </button>
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
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >Voter
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="Voter"
                                    value={modifyVoter.address || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'address')}
                                />
                            </div>
                            <div className={'mb-2'}>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                >New Group
                                </label>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                    id="exampleFormControlInput1"
                                    placeholder="New Group"
                                    value={modifyVoter.group || ''}
                                    onChange={(e:any) => handelChangeModifyVoting(e,'group')}
                                />
                            </div>
                            <div>
                                <button className={'rounded-md bg-green-500 px-3 py-1.5'} onClick={handelModifyVoter}>
                                    Change Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Remove Voter</div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="px-6 pt-4 pb-2">
                            <div className="relative mb-3" data-te-input-wrapper-init="">
                                <div className={'mb-2'}>
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="pointer-events-none top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                    >Voter
                                    </label>
                                    <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-1 bg-gray-200 py-[0.32rem] px-3 leading-[1.6] outline-none "
                                        id="exampleFormControlInput1"
                                        placeholder="Voter"
                                        value={deleteVoter || ''}
                                        onChange={(e:any) => handelChangeDeleteVoting(e)}
                                    />
                                </div>
                                <div>
                                    <button className={'rounded-md bg-red-500 px-3 py-1.5'} onClick={handelDeleteVoter}>
                                        Remove Voter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Voting;
