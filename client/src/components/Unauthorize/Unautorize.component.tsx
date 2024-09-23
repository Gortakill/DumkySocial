import Link from 'next/link';

export const Unautorize = () => {
    return (
        <main className="flex flex-col justify-center items-center h-[50vh]">
            <h1 className="mb-4 text-xl font-bold">You are not authorize</h1>
            <div className="flex w-full justify-center">
                <Link
                    href="/auth/registration"
                    className="bg-blue-200 p-4 w-1/6 text-center rounded-xl mr-5 shadow-md hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                >
                    Registration
                </Link>
                <Link
                    href="/auth"
                    className="bg-blue-200 p-4 w-1/6 text-center rounded-xl mr-5 shadow-md hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                >
                    Login
                </Link>
            </div>
        </main>
    );
};
