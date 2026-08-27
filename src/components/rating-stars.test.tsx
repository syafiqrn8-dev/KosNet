import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RatingStars } from "./rating-stars";

describe("RatingStars", () => {
  it("menampilkan 5 bintang", () => {
    const { container } = render(<RatingStars rating={3} />);
    const stars = container.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
  });

  it("tidak interaktif secara default", () => {
    render(<RatingStars rating={4} />);
    const stars = screen.queryByRole("radio");
    expect(stars).not.toBeInTheDocument();
  });

  it("memanggil onChange saat diklik jika interactive", () => {
    const onChange = vi.fn();
    const { container } = render(<RatingStars rating={2} interactive onChange={onChange} />);
    const starButtons = container.querySelectorAll("[role='radio']");
    expect(starButtons.length).toBe(5);
    fireEvent.click(starButtons[3]); // klik bintang ke-4
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
