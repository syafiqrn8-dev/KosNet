import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("menggabungkan class dan mengabaikan nilai falsy", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("menyelesaikan konflik kelas tailwind", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
