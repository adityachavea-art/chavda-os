"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

type Client = {
  id?: string;
  name: string;
  company: string;
  revenue: string;
};

export default function CRMPage() {
  const [clients, setClients] = useState<Client[]>([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [revenue, setRevenue] = useState("");

  const fetchClients = async () => {
    const querySnapshot = await getDocs(collection(db, "clients"));

    const data: Client[] = [];

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...(doc.data() as Client),
      });
    });

    setClients(data);
  };

  const addClient = async () => {
    if (!name || !company || !revenue) return;

    await addDoc(collection(db, "clients"), {
      name,
      company,
      revenue,
    });

    setName("");
    setCompany("");
    setRevenue("");

    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        CRM Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
          placeholder="Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
      </div>

      <button
        onClick={addClient}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold mb-10"
      >
        Add Client
      </button>

      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold">
              {client.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {client.company}
            </p>

            <p className="text-green-400 mt-2">
              ₹ {client.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}