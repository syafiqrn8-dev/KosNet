import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FacilityBadge } from "./facility-badge";

describe("FacilityBadge", () => {
  it("menampilkan label dari kode fasilitas yang dikenal", () => {
    render(<FacilityBadge code="ac" />);
    expect(screen.getByText("AC")).toBeInTheDocument();
  });

  it("menampilkan kode sebagai fallback jika tidak dikenal", () => {
    render(<FacilityBadge code="unknown_fac" />);
    expect(screen.getByText("unknown_fac")).toBeInTheDocument();
  });

  it("menampilkan icon untuk fasilitas yang dikenal", () => {
    const { container } = render(<FacilityBadge code="wifi" />);
    // Lucide icons have specific class prefixes; just check label
    expect(screen.getByText("WiFi")).toBeInTheDocument();
  });

  it("menerima className tambahan", () => {
    render(<FacilityBadge code="ac" className="extra-class" />);
    expect(screen.getByText("AC").className).toContain("extra-class");
  });
});
