import { useEffect, useState } from "preact/hooks";
import { sortBy, prop, sortWith, ascend } from "ramda";

type Icon = {
  id: string;
  category: string;
  path: string;
  tags: Array<string>;
  title: string;
};
export type Data = Icon[];

export type IconsGroupedByCategory = {
  [key: string]: Icon[];
};

type ProcessedData = {
  categories: { value: string }[];
  sortedIcons: Data;
};

export default function useData() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<ProcessedData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(
        "https://healthicons.org/icons/meta-data.json"
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Data = await response.json();

      const categories = getCategories(data);
      const sortedIcons = sortByCategoryAndTitle(data);
      setData({ categories, sortedIcons });
      setStatus("fetched");
    };
    fetchData();
  }, []);
  return { data, status };
}

const sortByCategoryAndTitle = sortWith([
  ascend<Icon>(prop("category")),
  ascend<Icon>(prop("title")),
]);
/**
 * Get list of categories to be used in the dropdown
 */
const getCategories = (data: Data) => {
  const categories: string[] = ["All"];
  // generate unique list of categories from the meta data
  data.forEach((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  // map them to be {value: category}, because that is what the drop down component expects
  return categories.sort().map((category) => {
    return { value: capitalize(category) };
  });
};

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
