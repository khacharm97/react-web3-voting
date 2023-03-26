import React from 'react';
import useGetVotings from "../../client/api/queries/getVotings/useGetVotings";
import web3 from 'web3';

const Dashboard = () => {
    const {isSuccess, data: votings} = useGetVotings({});
    console.log(votings,'--')
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
                                                <button className={'rounded-md bg-sky-500/100 px-3 py-1.5'}>View more
                                                </button>
                                            </td>
                                        </tr>)
                                }) : null}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
