"use client";

import DateComponent from "@/components/Date";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface PressReleaseListItem {
  id: number;
  Title: string;
  CompanyName: string;
  Date: string | null;
  slug: string;
  Link: string;
  Target: string;
  Document: {
    DocumentTitle: string | null;
    DocumentFile: { url: string; name: string };
  } | null;
}

interface ListMeta {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  selectedYear: string;
  years: string[];
  search: string;
}

const PAGE_SIZE = 20;

export default function PressReleaseListUI() {
  const [items, setItems] = useState<PressReleaseListItem[]>([]);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(PAGE_SIZE),
      });
      if (year) params.set("year", year);
      if (appliedSearch) params.set("search", appliedSearch);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/press-releases?${params.toString()}`
      );
      const payload = await response.json();
      setItems((payload?.data as PressReleaseListItem[]) || []);
      setMeta((payload?.meta as ListMeta) || null);
    } catch {
      setItems([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [page, year, appliedSearch]);

  useEffect(() => {
    load();
  }, [load]);

  const pageCount = meta?.pageCount || 0;

  // Keep the pager to a window around the current page — there are hundreds.
  const pageWindow = () => {
    const span = 2;
    const from = Math.max(1, page - span);
    const to = Math.min(pageCount, page + span);
    const pages: number[] = [];
    for (let i = from; i <= to; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="ir-wrapper">
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Press Releases
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="section-ptb">
        <div className="ir-container">
          <div className="ir-heading">
            <h1>Press Releases</h1>
            <p>
              Rating rationales published by Infomerics, newest first.
              {meta ? ` ${meta.total.toLocaleString()} in total.` : ""}
            </p>
          </div>

          <div className="row gy-3 align-items-end mb-4">
            <div className="col-md-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                  setAppliedSearch(search.trim());
                }}
                className="d-flex gap-2"
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by company name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search press releases by company name"
                />
                <button type="submit" className="btn btn-ir-primary">
                  Search
                </button>
                {appliedSearch && (
                  <button
                    type="button"
                    className="btn btn-page"
                    onClick={() => {
                      setSearch("");
                      setAppliedSearch("");
                      setPage(1);
                    }}
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
            <div className="col-md-3 ms-md-auto">
              <select
                className="form-select"
                value={year}
                onChange={(e) => {
                  setPage(1);
                  setYear(e.target.value);
                }}
                aria-label="Filter press releases by year"
              >
                <option value="">All years</option>
                {(meta?.years || []).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <p>Loading press releases…</p>
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="ir-table-secondary table-responsive table-prp">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Company</th>
                      <th scope="col">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr
                        key={`${item.id}-${idx}`}
                        className={`${idx % 2 === 0 ? "bg1_press" : "bg2_press"}`}
                      >
                        <td>
                          <DateComponent date={item.Date || ""} />
                        </td>
                        <td>
                          <Link href={`/pressrelease/${item.slug}`} className="title mb-0">
                            {item.CompanyName}
                          </Link>
                        </td>
                        <td>
                          {item.Document?.DocumentFile?.url || item.Link ? (
                            <a
                              href={item.Document?.DocumentFile?.url || item.Link}
                              target={item.Target || "_blank"}
                              className="btn-download-press-relese for-download-subscription btn btn-sm d-flex align-items-center justify-content-center"
                            >
                              <img src="../images/download-icon.png" alt="Download" />
                            </a>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pageCount > 1 && (
                <div className="pagination-custom">
                  <button
                    className="btn btn-page"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <img
                      src="../images/prev-icon.png"
                      alt="Previous"
                      className="pagination-icon"
                    />
                  </button>
                  {page > 3 && (
                    <button className="btn btn-page" onClick={() => setPage(1)}>
                      1
                    </button>
                  )}
                  {pageWindow().map((p) => (
                    <button
                      key={p}
                      className={`btn btn-page${page === p ? " active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  {page < pageCount - 2 && (
                    <button className="btn btn-page" onClick={() => setPage(pageCount)}>
                      {pageCount}
                    </button>
                  )}
                  <button
                    className="btn btn-page"
                    disabled={page === pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  >
                    <img
                      src="../images/next-icon.png"
                      alt="Next"
                      className="pagination-icon"
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p>
                No press releases found
                {appliedSearch ? ` for “${appliedSearch}”` : ""}
                {year ? ` in ${year}` : ""}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
