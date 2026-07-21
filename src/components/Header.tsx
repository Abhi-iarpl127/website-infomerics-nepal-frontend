"use client";

import {
  GlobalData,
  GlobalMenuItem,
  ImageData,
  SearchData,
} from "@/types/common";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Implementation of menu opening/closing logic from @file_context_0 JS to React

const MainHeader = ({
  data,
  // logo,
  // submenu,
}: {
  data: GlobalData;
  logo: ImageData;
  submenu: GlobalMenuItem[];
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Menu open/close state
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bottom nav toggle logic
  const [bottomNav, setBottomNav] = useState<boolean>(false);

  // Dropdown states for menu items
  const [dropdownStates,setDropdownStates] = useState<{ [key: number]: boolean }>({});

  // Handle menu open (for mobile menu)
  const handleMenuOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    // setMenuOpen(true);
    setBottomNav(true)
    document.body.style.overflow = "hidden";
  };

  // Handle menu close
  const handleMenuClose = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    console.log("handleMenuClose");
    setMenuOpen(false);
    // setBottomNav(false)
    document.body.style.overflow = "auto";
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (e: React.MouseEvent, itemId: number) => {
    e.preventDefault();
    setDropdownStates(prev => {
      const newStates: { [key: number]: boolean } = {};
      Object.keys(prev).forEach(key => {
        newStates[Number(key)] = false;
      });
      newStates[itemId] = !prev[itemId];
      return newStates;
    });
  };

  useEffect(() => {
    if (!menuOpen) return;

    function handleClick(e: MouseEvent) {
      if (
        window.innerWidth < 1200 &&
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        handleMenuClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  // Handle mobile search open/close
  const handleMobileSearchOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSearch(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };

  const handleMobileSearchClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowSearch(false);
    setSearchResults([]);
    setSearchText("");
  };

  // Close search bar if click outside (when on mobile)
  useEffect(() => {
    if (!showSearch) return;
    const handler = (e: MouseEvent) => {
      if (
        window.innerWidth < 1200 &&
        showSearch &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        handleMobileSearchClose();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showSearch]);

  // Fetch autocomplete results
  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/autocomplete?query=${searchText}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data);
      } catch (error: unknown) {
        console.error("Error fetching autocomplete results:", error);
        setSearchResults([]);
      }
    }

    if (searchText && searchText.length > 2) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  // Bottom nav logic
  const handleBottomNavToggle = () => {
    console.log("handleBottomNavToggle");
    // setBottomNav((prev) => !prev);
    setMenuOpen(true);
  };
  const handleBottomNavClose = () => {
    console.log("handleBottomNavClose");
    setBottomNav(false);
    setMenuOpen(false);
  }

  return (
    <header className="ir-header">
      {/* Navbar */}
      <div className="ir-navbar">
        <div className="container ir-container">
          {/* Helpdesk (desktop only) */}
          <a
            href={`tel:${data.HeaderRight.HelpdeskText}`}
            className="btn-helpdesk-header d-none d-md-flex"
          >
            Helpdesk:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: data.HeaderRight.HelpdeskText,
              }}
            />
          </a>
        </div>

        <nav className="navbar navbar-expand-xl">
          <div className="container ir-container mt-lg-4">
            {/* Logo */}
            <Link className="navbar-brand" href="/">
              <img
                src={data.MainHeader.Logo.url}
                alt={
                  data.MainHeader.Logo.alternativeText ||
                  data.MainHeader.Logo.name ||
                  ""
                }
              />
            </Link>

            {/* Left (mobile: search icon) */}
            <button
              className="btn-mobile-search d-xl-none"
              onClick={handleMobileSearchOpen}
              aria-label="Open Search"
              type="button"
            >
              <i className={`fa ${data.MainHeader.Search.searchclassfa}`}></i>
            </button>

            {/* Search Bar (also desktop) */}
            <div
              className={`header-search${showSearch ? " active" : ""}`}
              ref={searchBoxRef}
              style={
                typeof window !== "undefined" && window.innerWidth < 1200
                  ? { display: showSearch ? "flex" : "none" }
                  : undefined
              }
            >
              <div className="search_inner">
                <i className={`fa ${data.MainHeader.Search.searchclassfa}`}></i>
                <input
                  type="text"
                  id="search"
                  ref={searchInputRef}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={data.MainHeader.Search.SearchTitle}
                />
                <button
                  type="button"
                  className="btn-search"
                  onClick={() => {
                    /* optionally do submit */
                  }}
                >
                  {data.MainHeader.Search.ButtonText || "Search"}
                </button>
                <span
                  className="search-close"
                  onClick={handleMobileSearchClose}
                  role="button"
                  tabIndex={0}
                  aria-label="Close Search"
                >
                  &times;
                </span>
              </div>
              <div
                className="search-content"
                style={{
                  display: searchResults.length > 0 ? "block" : "none",
                }}
              >
                <div className="search-content-inner">
                  <ul>
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <Link
                          href={`/pressrelease/${result.slug}`}
                          onClick={() => {
                            setSearchText("");
                            handleMobileSearchClose();
                          }}
                          target="_self"
                        >
                          {result.CompanyName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side (desktop only) */}
            <div
              ref={menuRef}
              className={`header-right${menuOpen ? " active" : ""}`}
              id="irCollapsibleNav"
            >
              {/* Close button only for mobile */}
              <span
                className="menu-close"
                role="button"
                tabIndex={0}
                onClick={handleMenuClose}
                aria-label="Close Menu"
                style={{backgroundColor: "transparent"}}
              >
                &times;
              </span>

              {data.MainHeader.header.map((item) => (
                <Link
                  key={item.id}
                  href={
                    item.Link ||
                    (item?.page?.slug ? "/" + item?.page?.slug : "#") ||
                    "#"
                  }
                  target={item.Target === "Self" ? "_self" : "_blank"}
                >
                  {item.Title}
                </Link>
              ))}
              <Link
                href={data.MainHeader.Button.ButtonLink || "#"}
                target={
                  data.MainHeader.Button.Target === "Self" ? "_self" : "_blank"
                }
                className="btn-get-rated"
              >
                {data.MainHeader.Button.ButtonText || "Get Yourself Rated"}{" "}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="navbar-toggler menu-open d-xl-none"
              type="button"
              aria-label="Open Main Menu"
              onClick={handleMenuOpen}
              style={{ marginLeft: "auto" }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="container ir-container">
          {/* Toggle Button */}
          <div
            className="menu-toggle"
            aria-label="Toggle Menu"
            onClick={handleBottomNavToggle}
            tabIndex={0}
            role="button"
            // onClick={handleBottomNavToggle}
          >
            Infomerics Ratings
          </div>

          {/* Bottom Nav Content */}
          <div
            className={`bottom-nav-inner${bottomNav ? " open" : ""}`}
          >
            {/* Close Button (mobile only) */}
            <span
              className="bottom-nav-close"
              role="button"
              tabIndex={0}
              aria-label="Close Bottom Nav"
              onClick={handleBottomNavClose}
            >
              ×
            </span>

            <div className="row">
              <div className="col-xl d-flex mobile_alignment justify-content-center flex-wrap">
                {data.SubHeader.MenuItem.map((item, index) => (
                  <div key={index} className={`dropdown ${dropdownStates[item.id] ? "open" : ""}`}>
                    <a
                      href={
                        item.Link ||
                        (item?.page?.slug ? "/" + item?.page?.slug : "#") ||
                        "#"
                      }
                      onClick={
                        item?.Submenuitem && item?.Submenuitem?.length > 0
                          ? (e) => handleDropdownToggle(e, item.id)
                          : undefined
                      }
                      className={`dropdown-toggle ${item?.Submenuitem && item?.Submenuitem?.length > 0 ? "" : "no-arrow"}`}
                    >
                      {item.Title}
                    </a>
                    <div className="dropdown-menu">
                      {item.Submenuitem?.map((subitem, subindex) => (
                        <a
                          href={
                            subitem.Link ||
                            (subitem?.page?.slug
                              ? "/" + subitem?.page?.slug
                              : subitem?.service?.slug
                              ? "/" + subitem?.service?.slug
                              : subitem?.rating?.slug
                              ? "/" + subitem?.rating?.slug
                              : "#") ||
                            "#"
                          }
                          key={subindex}
                        >
                          {subitem.Title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
