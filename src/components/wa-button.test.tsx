import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { WAButton } from "./wa-button";

describe("WAButton", () => {
  const phoneNumber = "08123456789";

  it("merender tautan WhatsApp dengan nomor yang dibersihkan", () => {
    render(<WAButton phoneNumber={phoneNumber} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://wa.me/628123456789");
  });

  it("menyertakan pesan template jika diberikan", () => {
    render(<WAButton phoneNumber={phoneNumber} message="Halo Kos" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("text=Halo%20Kos");
  });

  it("membuka tab baru", () => {
    render(<WAButton phoneNumber={phoneNumber} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("tidak merender link ketika disabled", () => {
    render(<WAButton phoneNumber={phoneNumber} disabled />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Chat WhatsApp Pemilik")).toBeInTheDocument();
  });
});
