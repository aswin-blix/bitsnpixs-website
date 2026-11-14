"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type { PortfolioCategory, PortfolioItem } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";

interface PortfolioExplorerProps {
  items: PortfolioItem[];
  categories: PortfolioCategory[];
  labels: { allLabel: string; filterLabel: string };
}

const ALL = "all";

/** Every portfolio sample with a category filter; cards reflow with layout animation. */
export function PortfolioExplorer({ items, categories, labels }: PortfolioExplorerProps) {
  const [filter, setFilter] = useState<string>(ALL);
  const options = [{ id: ALL, label: labels.allLabel }, ...categories.map((category) => ({ id: category.id, label: category.shortLabel }))];
  const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
  // Number each sample within its own category, independent of the filter.
  const indexOf = new Map(items.map((item) => [item.id, items.filter((other) => other.category === item.category).indexOf(item)]));
  const visible = filter === ALL ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <SegmentedControl legend={labels.filterLabel} options={options} value={filter} onChange={setFilter} className="mb-10" />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
            >
              <ProjectCard item={item} category={categoryById[item.category]} index={indexOf.get(item.id) ?? 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
