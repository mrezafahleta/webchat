import React from "react";
import { Head, usePage, Link } from "@inertiajs/inertia-react";

export default function App({ title, children }) {
    const { users, auth } = usePage().props;

    return (
        <div className="flex min-h-screen">
            <Head title={title} />
            <div className="w-1/3">
                <div className="fixed w-1/3 flex flex-col  h-full px-6 py-4 text-right border-r space-y-3">
                    <p>Your Friends</p>

                    <div className="flex-1 overflow-y-auto ">
                        {users.map((user) => (
                            <Link
                                className={`block ${
                                    route().current("show.chat", user.username)
                                        ? "text-blue-500"
                                        : "text-gray-400"
                                }`}
                                href={route("show.chat", user.username)}
                                key={user.id}
                            >
                                {user.name}
                            </Link>
                        ))}
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 space-y-3">
                        <p>{auth.user.name}</p>
                        <Link
                            className="border bg-white font-medium text-black rounded-xl px-4 py-2"
                            as="button"
                            href={route("logout")}
                            method="post"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-2/3">{children}</div>
        </div>
    );
}
