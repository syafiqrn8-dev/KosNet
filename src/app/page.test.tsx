import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("menampilkan judul utama KosNet", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1, name: "KosNet" })).toBeInTheDocument();
  });

  it("menampilkan tagline produk", () => {
    render(<HomePage />);
    expect(screen.getByText("Temukan kos dalam hitungan menit, bukan hari.")).toBeInTheDocument();
  });

  it("menampilkan komponen ListingCard", () => {
    render(<HomePage />);
    expect(screen.getByText("Kos Putri Melati")).toBeInTheDocument();
  });

  it("menampilkan komponen WAButton", () => {
    render(<HomePage />);
    expect(screen.getAllByText("Chat WhatsApp Pemilik").length).toBeGreaterThan(0);
  });

  it("menampilkan section Skeleton Loader", () => {
    render(<HomePage />);
    expect(screen.getByText("Skeleton Loader")).toBeInTheDocument();
  });
});
