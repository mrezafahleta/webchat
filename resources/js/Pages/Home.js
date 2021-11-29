import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import App from "../Layouts/App";

export default function Home({ props }) {
    return (
        <div className="px-6 py-4  min-h-screen">
            <div className="container">Start Chat Now</div>
        </div>
    );
}

Home.layout = (page) => <App children={page} title="Web Chat" />;
