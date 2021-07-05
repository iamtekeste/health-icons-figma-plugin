import {
  Container,
  Divider,
  Dropdown,
  render,
  SearchTextbox,
  Stack,
  Text,
  SegmentedControl,
} from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import IconList from "./icon-list";
import useData from "./use-data";
import styles from "./styles.css";

function Plugin() {
  const [state, setState] = useState<{
    searchTerm: string;
    style: string;
    selectedCategory: string;
  }>({
    searchTerm: "",
    style: "Outline",
    selectedCategory: "All",
  });

  const { data, status } = useData();

  if (!data || status === "fetching") {
    return <Text>Loading...</Text>;
  }
  const styleOptions = [{ value: "Outline" }, { value: "Filled" }];

  const { categories, sortedIcons } = data;

  const handleSearch = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value.toLowerCase();
    setState({ ...state, searchTerm });
  };

  const handleStyleChange = (style: string) => {
    setState({ ...state, style });
  };

  const handleCategoryChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const selectedCategory = event.currentTarget.value;
    setState({ ...state, selectedCategory });
  };

  const { searchTerm, selectedCategory, style } = state;
  return (
    <Stack space="small">
      <div>
        <SearchTextbox
          onInput={handleSearch}
          placeholder="Search Health Icons"
          value={searchTerm}
        />
        <Divider />
      </div>
      <Container space="small">
        <div class={styles.filterContainer}>
          <Dropdown
            style={{ flexBasis: 140 }}
            onChange={handleCategoryChange}
            options={categories}
            placeholder="Category"
            value={selectedCategory}
          />
          <SegmentedControl
            onValueChange={handleStyleChange}
            options={styleOptions}
            value={style}
          />
        </div>
      </Container>
      <IconList
        sortedIcons={sortedIcons}
        style={style.toLowerCase()}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </Stack>
  );
}
export default render(Plugin);
