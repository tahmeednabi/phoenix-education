import { Dispatch, SetStateAction, useState } from "react";
import _ from "underscore";

// type SetStateFunction<T> = (v: T[]) => T[];

export function useStickyArray<T extends { [key: string]: any }>(
  initialState: T[],
  compareKey?: keyof T
): [T[], Dispatch<SetStateAction<T[]>>] {
  const [state, _setState] = useState(initialState);

  function setState(value: SetStateAction<T[]>) {
    if (typeof value === "function") return;
    const iteratee = compareKey ? (x) => x[compareKey] : undefined;
    _setState((state) => _.uniq([...state, ...value], iteratee));
  }

  return [state, setState];
}
