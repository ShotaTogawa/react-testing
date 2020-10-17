import React from "react";
import {screen, render, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import RenderInput from "./RenderInput";

// 各テストケース(it)の後に必ず実行する処理を定義
// cleanupすることで、コンポーネントをアンマウントする。
afterEach(() => cleanup());

describe("Rendering", () => {
    it("should render all the elements correctly", () => {
        render(<RenderInput />);
        expect(screen.getByRole("button")).toBeTruthy();
        // placeholderで要素を特定できる
        expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
    })
})

describe("Input form onChange event", () => {
    it("should update input value correctly", () => {
        render(<RenderInput />);
        const inputValue = screen.getByPlaceholderText("Enter");
        // 第二引数は、ユーザーがタイプする値
        userEvent.type(inputValue, "test");
        expect(inputValue.value).toBe("test");
    })
})

describe("Console Button conditionally triggered", () => {
    it("should not call output function", () => {
        // dummyを定義する。関数を呼び出せるかどうかをテストする。
        const outputConsole = jest.fn();
        render(<RenderInput outputConsole={outputConsole} />)
        userEvent.click(screen.getByRole("button"));
        // 関数が呼ばれないテスト
        expect(outputConsole).not.toHaveBeenCalled();
    })
    it("should call output function", () => {
        const outputConsole = jest.fn();
        render(<RenderInput outputConsole={outputConsole} />);
        const inputValue = screen.getByPlaceholderText("Enter");
        userEvent.type(inputValue, "test");
        userEvent.click(screen.getByRole("button"));
        // 一回だけ呼ばれるかを確認
        expect(outputConsole).toHaveBeenCalledTimes(1);
    })
})