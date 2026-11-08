import "@testing-library/jest-dom/vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

// Step 3
describe("Counter App", () => {
  // displays Counter starting at 0
  test("Start at 0", () => {
    render(<App />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
  // increments the count when the increment button is clicked
  test("Count is 1 when increment button is clicked", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
  // decrements the count when the decrement button is clicked
  test("Count is -1 when decrement button is clicked", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });
  // resets the count when the reset button is clicked
  test("Count is 0 when reset button is clicked", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  // resets the count after incrementing it twice
  test("Count goes back to 0 when reset button is clicked", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Increment"));
    await userEvent.click(screen.getByText("Increment"));

    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  // Step 4: displays the starting state
  test("Start at 0 and shows all buttons", () => {
    render(<App />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    expect(screen.getByText("Increment")).toBeInTheDocument();
    expect(screen.getByText("Decrement")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  // Step 6: a sequence of actions
  test("Count stays correct through a sequence of clicks", async () => {
    render(<App />);

    // Increment several times
    await userEvent.click(screen.getByText("Increment"));
    await userEvent.click(screen.getByText("Increment"));
    await userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 3")).toBeInTheDocument();

    // Decrement after incrementing
    await userEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    // Reset after several changes
    await userEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    // Keep using the buttons after resetting
    await userEvent.click(screen.getByText("Decrement"));
    await userEvent.click(screen.getByText("Decrement"));
    await userEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: -3")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: -2")).toBeInTheDocument();
  });

  // Step 7, 8, 9 in README.md file.
});
