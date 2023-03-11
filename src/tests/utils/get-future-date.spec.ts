import { test, expect } from "vitest";
import { getFutureDate } from "./get-future-date";

test('increase date by one year', () => {
    const year = new Date().getFullYear()
    expect(getFutureDate(`${year}-11-06`).getFullYear()).toBe(year + 1);
})