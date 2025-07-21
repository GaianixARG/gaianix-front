import { type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
};

const Card = ({ icon: Icon, label, value }: Props) => {
  return (
    <div className="flex items-center p-4 bg-white border rounded-2xl shadow-sm">
      <div className="p-3 bg-primary/10 rounded-full mr-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default Card;
