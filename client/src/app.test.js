import App from "./app";
import { render } from "@testing-library/react";
test("App renders correctly", async () => {
    fetch.mockResolveValue({
        async JSON() {
            return {};
        },
    });
    const { container } = render(<App />);
    console.log(container);
});
