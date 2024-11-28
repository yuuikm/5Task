import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

export default function SliderInput({
  label,
  value,
  setValue,
}: SliderInputProps) {
  return (
    <div className="max-w-sm mx-auto">
      <label className="block text-sm font-medium text-gray-700">
        {label}: {value.toFixed(1)}
      </label>
      <Slider
        value={[value]}
        onValueChange={(val) => setValue(val[0])}
        step={0.1}
        min={0}
        max={10}
        className="mt-2"
      />
    </div>
  );
}
