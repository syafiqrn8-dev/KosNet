import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("menampilkan judul KosNet dan tagline", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1, name: "KosNet" })).toBeInTheDocument();
    expect(screen.getByText("Temukan kos dalam hitungan menit, bukan hari.")).toBeInTheDocument();
  });

  it("menampilkan tombol mulai", () => {
    render(<HomePage />);
    expect(screen.getByRole("button", { name: /mulai/i })).toBeInTheDocument();
  });
});
