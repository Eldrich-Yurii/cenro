import { TbFileCheck, TbHourglass, TbCancel, TbEqual } from "react-icons/tb";
import { getAllApplication } from "../../../../../api/ApplicationApi";
import { useState, useEffect } from "react";

export default function TotalApplication() {
    const [counts, setCounts] = useState({
        approved: 0,
        pending: 0,
        rejected: 0,
        total: 0,
    });

    useEffect(() => {
        const fetchAndCountApplications = async () => {
            try {
                const applications = await getAllApplication();
                const approvedCount = applications.filter(
                    (app) => app.status === "Approved"
                ).length;
                const pendingCount = applications.filter(
                    (app) => app.status === "Pending"
                ).length;
                const rejectedCount = applications.filter(
                    (app) => app.status === "Rejected"
                ).length;
                const totalCount = applications.length;

                setCounts({
                    approved: approvedCount,
                    pending: pendingCount,
                    rejected: rejectedCount,
                    total: totalCount,
                });
            } catch (err) {
                console.error("Error fetching applications:", err);
            }
        };

        fetchAndCountApplications();
    }, []);

    return (
        <div className="grid grid-flow-col gap-3">
            <section className="bg-lime-100 text-lime-700 rounded-lg p-3 shadow-lg">
                <header className="flex justify-between items-start">
                    <p className="font-semibold">Approved</p>
                    <TbFileCheck className="text-3xl" />
                </header>
                <h2 className="font-semibold text-4xl">{counts.approved}</h2>
            </section>
            <section className="bg-yellow-100 text-orange-600 rounded-lg py-2 px-3 shadow-lg">
                <header className="flex justify-between items-start">
                    <p className="font-semibold">Pending</p>
                    <TbHourglass className="text-3xl" />
                </header>
                <h2 className="font-semibold text-4xl">{counts.pending}</h2>
            </section>
            <section className="bg-pink-100 text-red-600 rounded-lg py-2 px-3 shadow-lg">
                <header className="flex justify-between items-start">
                    <p className="font-semibold">Rejected</p>
                    <TbCancel className="text-3xl" />
                </header>
                <h2 className="font-semibold text-4xl">{counts.rejected}</h2>
            </section>
            <section className="bg-blue-100 text-blue-700 rounded-lg py-2 px-3 shadow-lg">
                <header className="flex justify-between items-start">
                    <p className="font-semibold">Total Applications</p>
                    <TbEqual className="text-3xl" />
                </header>
                <h2 className="font-semibold text-4xl">{counts.total}</h2>
            </section>
        </div>
    );
}