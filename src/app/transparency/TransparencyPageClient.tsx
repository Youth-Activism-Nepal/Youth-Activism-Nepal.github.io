"use client";

import { useEffect, useState } from "react";
import { getFinancialReports, type FinancialReport } from "@/lib/apiClient";

export default function TransparencyPageClient() {
  const [reports, setReports] = useState<FinancialReport[]>([]);

  useEffect(() => {
    getFinancialReports().then(setReports).catch(() => setReports([]));
  }, []);

  return (
    <main className="min-h-[75vh] bg-offWhite px-6 py-16 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#DB1920]">About Youth Activism Nepal</p>
        <h1 className="mt-3 text-4xl font-black text-textBlue sm:text-5xl">Transparency</h1>
        <p className="mt-5 max-w-2xl text-textBlue/80">We are committed to sharing clear information about our work, finances, and accountability.</p>
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-textBlue">Financial Reports</h2>
          {reports.length === 0 ? (
            <p className="mt-3 text-textBlue/75">Our financial reports will be published here as they become available.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {reports.map((report) => (
                <article key={report.mongoId ?? report.id ?? report.drive_url} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-textBlue">{report.title}</h3>
                      <p className="mt-1 text-sm text-textBlue/70">{report.organization} · {report.fiscal_year}{report.report_type ? ` · ${report.report_type}` : ""}</p>
                      {report.description && <p className="mt-2 text-sm text-textBlue/75">{report.description}</p>}
                    </div>
                    <a href={report.drive_url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-md bg-primaryRed px-4 py-2 text-center text-sm font-semibold text-white hover:bg-red-700">View report</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
