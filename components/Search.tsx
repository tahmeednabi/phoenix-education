import { getInputDefaults } from "@components/Input";
import React, { forwardRef, useRef, useState } from "react";
import {
  Select as MantineSearch,
  SelectItemProps,
  SelectProps,
} from "@mantine/core";
import { Search as SearchIcon } from "tabler-icons-react";

export type ISelectItem<T> = SelectItemProps & { data: T };

interface SearchProps<T> extends SelectProps {
  dark?: boolean;
  renderOption?: { (option: ISelectItem<T>): React.ReactNode };
}

export function SelectableItem<T>(
  renderOption: SearchProps<T>["renderOption"]
) {
  return forwardRef<HTMLDivElement, ISelectItem<T>>((props, ref) => {
    if (!renderOption)
      renderOption = (o) => (
        <div className="p-2">{o.label ? o.label : String(o)}</div>
      );

    return (
      <div ref={ref} {...props} style={{ padding: 0 }}>
        {renderOption(props)}
      </div>
    );
  });
}

function Search<T>(props: SearchProps<T>) {
  const {
    renderOption = (o) => (
      <div className="p-2">{o.label ? o.label : String(o)}</div>
    ),
    rightSection,
    onChange,
    ..._props
  } = props;

  const ref = useRef<HTMLInputElement | null>(null);
  const [searching, setSearching] = useState(false);

  const defaults: Omit<SearchProps<T>, "data"> = getInputDefaults(props);

  const selectedItem = props.data.find(
    (o) => typeof o !== "string" && o.value === props.value
  );

  return (
    <MantineSearch
      ref={ref}
      rightSection={
        rightSection || <SearchIcon className="w-5 h-5 text-gray-500" />
      }
      icon={
        props.renderOption && selectedItem && !searching
          ? // @ts-ignore
            renderOption(selectedItem)
          : undefined
      }
      styles={
        props.renderOption && !searching
          ? {
              icon: {
                width: "100%",
                justifyContent: "flex-start",
                opacity: 1,
                color: "inherit",
              },
              input: {
                color: "rgba(0,0,0,0)",
              },
            }
          : undefined
      }
      onInput={({ nativeEvent }) => {
        setSearching(true);
        onChange && onChange(null);
        if (!searching && !!ref.current) {
          // @ts-ignore
          ref.current.value = nativeEvent?.data || "";
        }
      }}
      onChange={(value) => {
        onChange && onChange(value);
        setSearching(false);
      }}
      searchable
      itemComponent={SelectableItem(renderOption)}
      transitionProps={{
        transition: "fade",
        duration: 100,
        timingFunction: "ease",
      }}
      withinPortal
      {...defaults}
      {..._props}
    />
  );
}

export { Search };
