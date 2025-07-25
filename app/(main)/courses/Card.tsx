import { cn } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  isLoading?: boolean;
};
const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
  isLoading,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opcity-50"
      )}
    >
      <div className="min-[24] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-10">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin"></Loader>
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg drop-shadow-md border object-coverz"
      />
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
    </div>
  );
};

export default Card;
