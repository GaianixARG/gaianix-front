import type { LucideIcon } from "lucide-react";
import IconRounded from "../ui/IconRounded";

type Props = {
  icon: LucideIcon;
  label: string;
  value: number;
};

const SummaryCard = ({ icon: Icon, label, value }: Props) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-lg">
      <IconRounded icon={Icon} tipo="primary" size="md" className="mr-4" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
