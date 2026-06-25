import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LumiereLogo } from "./LumiereLogo";

describe("LumiereLogo", () => {
  it("renders with default size", () => {
    render(<LumiereLogo />);
    const logo = screen.getByLabelText("Lumière logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "48");
  });

  it("renders with custom size", () => {
    render(<LumiereLogo size={64} />);
    const logo = screen.getByLabelText("Lumière logo");
    expect(logo).toHaveAttribute("width", "64");
    expect(logo).toHaveAttribute("height", "64");
  });

  it("applies custom className", () => {
    render(<LumiereLogo className="test-class" />);
    expect(screen.getByLabelText("Lumière logo")).toHaveClass("test-class");
  });
});
