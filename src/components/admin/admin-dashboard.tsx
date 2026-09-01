"use client";

import { useEffect, useMemo, useState } from "react";

import type { AdminUser } from "@/lib/auth";
import type { SignupRecord } from "@/lib/admin-service";
import { signupStatuses } from "@/lib/signup";
import { siteContent } from "@/content/site";

type DashboardProps = {
  initialSignups: SignupRecord[];
  total: number;
  user: AdminUser;
  useCases: string[];
};

export function AdminDashboard({
  initialSignups,
  total,
  user,
  useCases,
}: DashboardProps) {
  const [signups, setSignups] = useState(initialSignups);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [useCase, setUseCase] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      search,
      status,
      useCase,
    });

    const run = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/admin/signups?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );
        const data = (await response.json()) as {
          signups?: SignupRecord[];
          message?: string;
        };
        if (!response.ok) {
          throw new Error(data.message || "Could not load signups.");
        }
        setSignups(data.signups || []);
      } catch (err) {
        if (!(err instanceof DOMException)) {
          setError(
            err instanceof Error ? err.message : "Could not load signups.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    void run();
    return () => controller.abort();
  }, [search, status, useCase]);

  const exportHref = useMemo(() => {
    const params = new URLSearchParams({ search, status, useCase });
    return `/api/admin/signups/export?${params.toString()}`;
  }, [search, status, useCase]);

  async function updateStatus(id: string, nextStatus: string) {
    setError("");
    const previous = signups;
    setSignups((current) =>
      current.map((signup) =>
        signup.id === id
          ? { ...signup, signupStatus: nextStatus as never }
          : signup,
      ),
    );

    const response = await fetch(`/api/admin/signups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signupStatus: nextStatus }),
    });

    if (!response.ok) {
      setSignups(previous);
      const data = (await response.json()) as { message?: string };
      setError(data.message || "Could not update status.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-synq-navy/10 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-synq-teal">
              Protected admin view
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-synq-navy">
              Early-access registrations
            </h1>
            <p className="mt-2 text-sm text-synq-ink/72">
              Signed in as {user.name || user.email}. Owner contact:{" "}
              {siteContent.contactEmail}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-synq-cream px-5 py-4 text-synq-navy">
            <p className="text-sm text-synq-ink/72">Total registrations</p>
            <p className="mt-1 font-display text-3xl font-bold">{total}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-synq-navy/10 bg-white p-6 shadow-card md:grid-cols-4">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-synq-navy">
            Search name or email
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-synq-navy/12 px-4 py-3 text-sm outline-none focus:border-synq-teal focus:ring-2 focus:ring-synq-teal/20"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-synq-navy">
            Use case
          </span>
          <select
            value={useCase}
            onChange={(event) => setUseCase(event.target.value)}
            className="w-full rounded-2xl border border-synq-navy/12 px-4 py-3 text-sm outline-none focus:border-synq-teal focus:ring-2 focus:ring-synq-teal/20"
          >
            <option value="all">All use cases</option>
            {useCases.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-synq-navy">
            Signup status
          </span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-2xl border border-synq-navy/12 px-4 py-3 text-sm outline-none focus:border-synq-teal focus:ring-2 focus:ring-synq-teal/20"
          >
            <option value="all">All statuses</option>
            {signupStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={exportHref}
          className="inline-flex items-center justify-center rounded-full bg-synq-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2237]"
        >
          Export visible CSV
        </a>
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/admin/session", { method: "DELETE" });
            window.location.reload();
          }}
          className="inline-flex items-center justify-center rounded-full border border-synq-navy/12 bg-white px-5 py-3 text-sm font-semibold text-synq-navy"
        >
          Sign out
        </button>
        {loading ? (
          <p className="text-sm text-synq-ink/72">Refreshing signups…</p>
        ) : null}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-synq-navy/10 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-synq-navy/8">
            <thead className="bg-synq-cream">
              <tr className="text-left text-sm text-synq-navy">
                <th className="px-4 py-4 font-semibold">Name</th>
                <th className="px-4 py-4 font-semibold">Email</th>
                <th className="px-4 py-4 font-semibold">Use case</th>
                <th className="px-4 py-4 font-semibold">Group size</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-synq-navy/8 text-sm">
              {signups.map((signup) => (
                <tr key={signup.id}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-medium text-synq-navy">
                      {signup.firstName}
                    </p>
                    {signup.biggestChallenge ? (
                      <p className="mt-2 max-w-xs text-synq-ink/72">
                        {signup.biggestChallenge}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 align-top text-synq-ink/78">
                    <p>{signup.email}</p>
                    {signup.whatsappNumber ? (
                      <p className="mt-2">{signup.whatsappNumber}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 align-top text-synq-ink/78">
                    {signup.primaryUseCase}
                  </td>
                  <td className="px-4 py-4 align-top text-synq-ink/78">
                    {signup.typicalGroupSize || "—"}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <select
                      value={signup.signupStatus}
                      onChange={(event) =>
                        void updateStatus(signup.id, event.target.value)
                      }
                      className="rounded-2xl border border-synq-navy/12 px-3 py-2 outline-none focus:border-synq-teal focus:ring-2 focus:ring-synq-teal/20"
                    >
                      {signupStatuses.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 align-top text-synq-ink/78">
                    {signup.createdAt
                      ? new Date(signup.createdAt).toLocaleString()
                      : "Pending timestamp"}
                  </td>
                </tr>
              ))}
              {signups.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-synq-ink/72"
                  >
                    No registrations match the current filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
