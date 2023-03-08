import { isEqual } from "lodash";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useDeepEffect(
  effectFunc: EffectCallback,
  deps: DependencyList
) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((o, i) => isEqual(o, deps[i]));
    if (isFirst.current || !isSame) {
      effectFunc();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}
