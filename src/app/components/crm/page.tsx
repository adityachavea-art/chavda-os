import {
  Search,
  Plus,
  Phone,
  Mail,
  Building2,
  MoreHorizontal,
} from "lucide-react";

const clients = [
  {
    name: "Reliance Industries",
    contact: "Rohan Sharma",
    email: "rohan@reliance.com",
    phone: "+91 98765 43210",
    value: "₹4.2L",
    status: "Active",
  },
  {
    name: "Tata Motors",
    contact: "Amit Verma",
    email: "amit@tatamotors.com",
    phone: "+91 98765 12345",
    value: "₹2.8L",
    status: "Pending",
  },
  {
    name: "Infosys Ltd",
    contact: "Sneha Patel",
    email: "sneha@infosys.com",
    phone: "+91 99887 77665",
    value: "₹1.9L",
    status: "Active",
  },
  {
    name: "Adani Group",
    contact: "Raj Mehta",
    email: "raj@adani.com",
    phone: "+91 91234 56789",
    value: "₹5.1L",
    status: "Negotiation",
  },
];

export default function CRMPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
            Client Management
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            CRM Workspace
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Manage leads, enterprise clients, invoices and
            business relationships from one centralized
            workspace.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-[320px] items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              placeholder="Search clients..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium transition hover:bg-blue-400">
            <Plus className="h-4 w-4" />

            Add Client
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <p className="text-sm text-zinc-500">
            Total Clients
          </p>

          <h2 className="mt-3 text-5xl font-black">
            128
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <p className="text-sm text-zinc-500">
            Active Deals
          </p>

          <h2 className="mt-3 text-5xl font-black">
            34
          </h2>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <p className="text-sm text-zinc-500">
            Monthly Revenue
          </p>

          <h2 className="mt-3 text-5xl font-black">
            ₹12.4L
          </h2>
        </div>
      </div>

      {/* CLIENT TABLE */}

      <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111318]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <div>
            <h3 className="text-xl font-bold">
              Enterprise Clients
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Client database and active relationships
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-white/[0.06] bg-white/[0.02]">
              <tr className="text-left text-sm text-zinc-500">
                <th className="px-6 py-4 font-medium">
                  Company
                </th>

                <th className="px-6 py-4 font-medium">
                  Contact
                </th>

                <th className="px-6 py-4 font-medium">
                  Communication
                </th>

                <th className="px-6 py-4 font-medium">
                  Revenue
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.name}
                  className="border-b border-white/[0.06] transition hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                        <Building2 className="h-6 w-6 text-blue-400" />
                      </div>

                      <div>
                        <p className="font-semibold">
                          {client.name}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Enterprise Account
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium">
                        {client.contact}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Relationship Manager
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Mail className="h-4 w-4" />

                        {client.email}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Phone className="h-4 w-4" />

                        {client.phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-lg font-bold">
                      {client.value}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-medium ${
                        client.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : client.status === "Pending"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] text-zinc-400 transition hover:bg-white/[0.04] hover:text-white">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}