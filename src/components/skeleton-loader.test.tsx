import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SkeletonLoader } from "./skeleton-loader";

describe("SkeletonLoader", () => {
  it("merender varian default (text)", () => {
    const { container } = render(<SkeletonLoader />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("animate-pulse");
  });

  it("merender varian card", () => {
    const { container } = render(<SkeletonLoader variant="card" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merender varian avatar", () => {
    const { container } = render(<SkeletonLoader variant="avatar" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("menerima className tambahan", () => {
    const { container } = render(<SkeletonLoader className="custom-class" variant="text" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-class");
  });
});
