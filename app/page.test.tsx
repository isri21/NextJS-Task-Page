import { render, screen } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
describe("Check If everything loads.", () => {
    beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [], // empty task list
  }) as jest.Mock
})
  it("Should Test Some Thing", async () => {
    const queryClient = new QueryClient()
    render(<QueryClientProvider client={queryClient}><Home/></QueryClientProvider>);
    expect(await screen.findByRole("textbox", { name: "input-task" })).toBeInTheDocument()
  });
});
