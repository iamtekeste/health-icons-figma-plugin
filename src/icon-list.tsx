import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Data } from "./use-data";
import styles from "./styles.css";
import { emit } from "@create-figma-plugin/utilities";
type SvgInlineProps = { url: string; title: string };

const SvgInline = ({ url, title }: SvgInlineProps) => {
  const importToFigma = () => {
    emit("IMPORT", { title, svg });
  };

  let [svg, setSvg] = useState<string>("");
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url, { cache: "force-cache" });
        if (!response.ok) throw new Error("failed to fetch svg.");
        const svg = await response.text();
        setSvg(svg);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSvg();
  }, [url]);
  if (!svg) return null;
  return (
    <button
      dangerouslySetInnerHTML={{ __html: svg }}
      class={styles.icon}
      onClick={importToFigma}
    />
  );
};

type Props = {
  sortedIcons: Data;
  style: string;
  searchTerm: string;
  selectedCategory: string;
};

const IconList = ({
  sortedIcons,
  style,
  searchTerm,
  selectedCategory,
}: Props) => {
  const icons = sortedIcons
    .filter(({ title, category, tags }) => {
      // nothing to filter by, show every icon
      if (selectedCategory === "All" && !searchTerm) {
        return true;
      }
      // user entered a search query and selected a category, therefore filter by both
      if (searchTerm && selectedCategory !== "All") {
        return (
          (title.toLowerCase().indexOf(searchTerm) > -1 ||
            tags.join(" ").toLowerCase().indexOf(searchTerm) > -1) &&
          category.indexOf(selectedCategory.toLowerCase()) > -1
        );
      }
      // user entered a search query only and didn't select a category
      if (searchTerm) {
        return (
          title.toLowerCase().indexOf(searchTerm) > -1 ||
          tags.join(" ").toLowerCase().indexOf(searchTerm) > -1
        );
      }
      // user selected a category but didn't enter a search query
      if (selectedCategory !== "All") {
        return (
          category.toLowerCase().indexOf(selectedCategory.toLowerCase()) > -1
        );
      }
    })
    .map(({ title, path }) => {
      return (
        <SvgInline
          title={title}
          url={`https://healthicons.org/icons/svg/${style}/${path}.svg`}
        />
      );
    });
  return <div class={styles.iconList}>{icons}</div>;
};

export default IconList;
