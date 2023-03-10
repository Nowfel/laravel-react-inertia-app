import React from "react";
import moment from "moment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router  } from "@inertiajs/react";

const ReadFile = (props) => {
    const files = props.files.data;
    function destroy(id) {
        if (confirm("Are you sure you want to Delete")) {
            router.delete("files/destroy/" + id);
        }
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">
                    Uploaded Files
                </h2>
            }
        >
            <div className="relative mx-16 mt-4 overflow-x-auto sm:rounded-lg">
                {files.length ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
                        <thead className="text-xs text-white uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    File name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files?.map((file, index) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {file.filename}
                                    </th>
                                    <td className="px-6 py-4">
                                        {moment(file.created_at).format(
                                            "MMMM DD, YYYY"
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <a
                                            rel="noreferrer"
                                            target="_blank"
                                            download
                                            href={file.url}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Download
                                        </a>
                                        <button className="focus:outline-none text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mb-2 bg-red-500 focus:ring-red-800" onClick={()=>destroy(file.id)} >Delete</button>
                                        
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="font-bold text-lg text-center mt-8">You don't have any uploaded file</h1>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ReadFile;
