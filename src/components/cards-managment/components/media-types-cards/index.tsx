import { FaCreditCard } from "react-icons/fa";
import CustomButton from "src/@core/components/button";

interface MediaType {
  id: string;
  code: string;
  description: string;
}

interface MediaTypesCardProps {
  selectedMedia: string;
  setSelectedMedia: (code: string) => void;
  mediaTypes: MediaType[];
}

export default function MediaTypesCard({
  selectedMedia,
  setSelectedMedia,
  mediaTypes,
}: MediaTypesCardProps) {
  return (
    <div>
      <h2 className="mt-4 mb-3">نوع کارت</h2>
      <div className="flex gap-3 flex-wrap">
        {mediaTypes.map((item) => (
          <CustomButton
            key={item.id}
            onClick={() => setSelectedMedia(item.code)}
            variant={selectedMedia === item.code ? "contained" : "outlined"}
            startIcon={<FaCreditCard size={20} />}
            label={item.description}
          />
        ))}
      </div>
    </div>
  );
}
