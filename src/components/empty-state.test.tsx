import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("menampilkan judul dan deskripsi", () => {
    render(<EmptyState title="Tidak ditemukan" description="Coba filter lain" />);
    expect(screen.getByText("Tidak ditemukan")).toBeInTheDocument();
    expect(screen.getByText("Coba filter lain")).toBeInTheDocument();
  });

  it("menampilkan action jika diberikan", () => {
    render(
      <EmptyState title="Kosong" description="Tidak ada data" action={<button>Reset</button>} />,
    );
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });
});
