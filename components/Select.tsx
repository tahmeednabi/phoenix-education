import { getInputDefaults } from "@components/Input";
import React from "react";
import {
  Select as MantineSelect,
  SelectProps as MantineSelectProps,
} from "@mantine/core";
import { ISelectItem, SelectableItem } from "./Search";

export interface SelectProps<T> extends MantineSelectProps {
  renderOption?: { (option: ISelectItem<T>): React.ReactNode };
}

function Select<T>(props: SelectProps<T>) {
  const {
    renderOption = (o) => (
      <div className="p-2">{o.label ? o.label : String(o)}</div>
    ),
    ..._props
  } = props;

  const defaults: Omit<SelectProps<T>, "data"> = getInputDefaults(_props);

  return (
    <MantineSelect
      transition="fade"
      transitionDuration={100}
      transitionTimingFunction="ease"
      itemComponent={SelectableItem(renderOption)}
      withinPortal
      {...defaults}
      {..._props}
    />
  );
}

export { Select };
