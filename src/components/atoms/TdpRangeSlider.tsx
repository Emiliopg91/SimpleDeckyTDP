// TDP Range Slider
import { SliderField } from "decky-frontend-lib";

type PropType = {
  tdpRange: number[];
  label: string;
  value: number;
  onChange: any;
};

const TdpRangeSlider = ({ tdpRange, label, value, onChange }: PropType) => {
  const [min, max] = tdpRange;

  return (
    <SliderField
      label={label}
      value={value}
      showValue
      step={1}
      valueSuffix="W"
      min={min}
      max={max}
      validValues="range"
      bottomSeparator="none"
      onChange={onChange}
    />
  );
};

export default TdpRangeSlider;
