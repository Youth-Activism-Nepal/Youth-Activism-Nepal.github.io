import React from "react";

export default function Donate() {
    return (
        <div className="h-full text-center sm:h-[84.5vh] items-center bg-offWhite overflow-hidden px-6 sm:px-6 md:px-8 lg:px-24 xl:px-32 mt-10 sm:mt-0 my-10">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="flex text-4xl font-black items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-900 to-red-950">
                    Donate to Youth Activism Nepal
                </h1>
                <p className="text-sm py-2 px-6 sm:px-28 lg:w-[80%] mx-auto text-textBlue">
                    Your support helps us continue our mission to empower the
                    youth of Nepal. Thank you for your generosity!
                </p>

                <h2 className="text-2xl font-semibold mt-6">
                    Bank Account Details
                </h2>
                <p className="text-sm py-2">
                    Please use the following bank account details to make a
                    donation:
                </p>
                <div className="text-sm py-2 px-6 w-[500px] mx-auto text-textBlue">
                    <div className="list-disc list-inside text-sm inline-block text-left">
                        <p className="text-center">
                            <strong>Bank Name:</strong> NABIL BANK LIMITED
                        </p>
                        <p className="text-center">
                            <strong>Account Name:</strong> Youth Activism Nepal
                        </p>
                        <p className="text-center">
                            <strong>Account Number:</strong> 26901017500012
                        </p>
                        <p className="text-center">
                            <strong>SWIFT Code:</strong> NARBNPKA
                        </p>
                        <p className="text-center">
                            <strong>Branch:</strong> Kanchanpur, Saptari, Nepal
                        </p>
                    </div>
                </div>

                <p className="text-sm py-2">
                    If you have any questions or need further assistance, please
                    contact us at{" "}
                    <a
                        href="mailto:info@youthactivismnepal.org"
                        className="text-blue-500 underline"
                    >
                        info@youthactivismnepal.org
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
