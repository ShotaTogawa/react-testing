import React from "react";
import {render, screen, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({username: "Bred dummy"}));
  })
)

// このテストファイルの最初に一度だけ実行される
beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    cleanup();
})
afterAll(() => server.close());

describe("Mocking API", () => {
    it("[Fetch Success] should display fetched data correctly and button disabled", async() => {
        render(<MockServer />);
        userEvent.click(screen.getByRole("button"));
        expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
        expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });

    it("[Fetch Failure] should display error msg, no render heading and button abled", async() => {
        // server.use()このテストケース一度だけ使用する場合に使う
        server.use(
          rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
            return res(ctx.status(404));
          })
        )
        render(<MockServer />);
        userEvent.click(screen.getByRole("button"));
        expect(await screen.findByTestId("error")).toHaveTextContent("Fetching failed!");
        expect(screen.queryByRole("heading")).toBeNull();
        expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
    })
})