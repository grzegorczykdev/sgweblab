import { Button } from "@/components/ui/button";
import type { ProjectFilterCategory } from "@/types/project";

interface PortfolioFiltersProps {
  activeCategory: ProjectFilterCategory;
  onChange: (category: ProjectFilterCategory) => void;
  labels: {
    all: string;
    websites: string;
    systems: string;
  };
}

const VISIBLE_FILTERS: ProjectFilterCategory[] = [
  "all",
  "websites",
  "systems",
];

const PortfolioFilters = ({
  activeCategory,
  onChange,
  labels,
}: PortfolioFiltersProps) => {
  const labelByCategory = {
    all: labels.all,
    websites: labels.websites,
    systems: labels.systems,
  };

  return (
    <section aria-label="Portfolio categories" className="flex flex-wrap gap-3">
      {VISIBLE_FILTERS.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "hero" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
          className="rounded-full"
        >
          {labelByCategory[category]}
        </Button>
      ))}
    </section>
  );
};

export default PortfolioFilters;
