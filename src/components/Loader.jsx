import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

// Default values shown
export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center">
      <Waveform size="35" stroke="3.5" speed="1" color="#db0000" />
    </div>
  );
}
