import { Card } from "@/components/ui/card";

const statsData = [
  { value: "$30K", label: "Market Cap" },
  { value: "24", label: "Holders" },
  { value: "$150K", label: "24h Volume" },
  { value: "300", label: "Community Members" },
];

const StatsSection = () => {
  return (
    <section className="py-8 bg-white bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {statsData.map((stat, index) => (
            <Card key={index} className="p-4 shadow">
              <p className="text-primary font-bold text-2xl md:text-3xl">
                {stat.value}
              </p>
              <p className="text-dark text-sm md:text-base">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
