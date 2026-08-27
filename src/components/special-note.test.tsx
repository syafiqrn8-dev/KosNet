import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialNote } from "./special-note";

describe("SpecialNote", () => {
  it("menampilkan teks catatan", () => {
    render(<SpecialNote note="Biaya listrik terpisah" />);
    expect(screen.getByText("Biaya listrik terpisah")).toBeInTheDocument();
  });

  it("menampilkan ikon info", () => {
    const { container } = render(<SpecialNote note="Test" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
