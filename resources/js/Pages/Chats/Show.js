import App from "@/Layouts/App";
import React, { useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { data } from "autoprefixer";
// import Echo from "laravel-echo";
import { Inertia } from "@inertiajs/inertia";

export default function Show(props) {
    const { user, chats, auth } = props;
    const scrollReff = useRef(null);
    const messageReff = useRef(null);

    // sts = side to side column chat, atau kiri kanan chat berdasarkan user
    const sts = (x, y, option = "justify") => {
        if (option == "justify") {
            return x === y ? "justify-end" : "justify-start";
        }
        if (option == "background") {
            return x === y
                ? "bg-green-100 text-green-900"
                : "bg-gray-100 text-gray-900";
        }
    };

    const { data, setData, erros, post, reset } = useForm({ message: "" });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("store.chat", user.username), {
            onSuccess: () => {
                reset("message");
                scrollReff.current.scrollTo(0, 9999999999);
            },
        });
    };

    Echo.channel("webchat").listen("MessageSent", ({ chats }) => {
        Inertia.reload({
            preserveScroll: true,
            onSuccess: () => {
                scrollReff.current.scrollTo(0, 9999999999);
            },
        });
    });

    useEffect(() => {
        scrollReff.current.scrollTo(0, 9999999);
        messageReff.current.focus();
    }, []);

    return (
        <div className="">
            <Head title={`Chat with ${user.name}`} />
            <div className="flex flex-col  h-screen">
                <div className="border-b py-3 px-6">
                    <h1>{user.name}</h1>
                </div>
                <div
                    className="flex-1 overflow-y-auto p-5 text-justify space-y-2"
                    ref={scrollReff}
                >
                    {chats.length ? (
                        chats.map((chat) => (
                            <div
                                className={`flex ${sts(
                                    auth.user.id,
                                    chat.sender_id
                                )}`}
                                key={chat.id}
                            >
                                <p
                                    className={`w-auto p-2  text-sm rounded-lg ${sts(
                                        auth.user.id,
                                        chat.sender_id,
                                        "background"
                                    )}  `}
                                >
                                    {chat.message}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Start Chat Now ...</p>
                    )}
                </div>

                <div className="border-t py-1 px-1">
                    <form onSubmit={submitHandler}>
                        <input
                            ref={messageReff}
                            value={data.message}
                            onChange={() =>
                                setData({
                                    ...data,
                                    message: event.target.value,
                                })
                            }
                            placeholder="Start typing..."
                            type="text"
                            autoComplete={"off"}
                            id="message"
                            name="message"
                            className="form-text border-none focus:outline-none text-black px-6 w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} title="Chats" />;
