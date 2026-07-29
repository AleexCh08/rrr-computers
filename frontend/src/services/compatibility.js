export const checkCompatibility = (build) => {
  const cpu = build.find(item => item.id === 'Procesador')?.selected;
  const mobo = build.find(item => item.id === 'Tarjeta Madre')?.selected;
  const ram = build.find(item => item.id === 'Ram')?.selected;
  let errors = [];

  // Validar CPU vs Motherboard (Intel vs AMD)
  if (cpu && mobo) {
    const cpuText = (cpu.name + " " + (cpu.description || "")).toLowerCase();
    const moboText = (mobo.name + " " + (mobo.description || "")).toLowerCase();

    const isCpuIntel = cpuText.includes('intel') || cpuText.includes('core i') || cpuText.includes('lga');
    const isCpuAmd = cpuText.includes('amd') || cpuText.includes('ryzen') || cpuText.includes('am4') || cpuText.includes('am5');

    const isMoboIntel = moboText.includes('intel') || moboText.includes('lga') || moboText.includes('h410') || moboText.includes('b460') || moboText.includes('z490') || moboText.includes('z590');
    const isMoboAmd = moboText.includes('amd') || moboText.includes('am4') || moboText.includes('am5') || moboText.includes('b450') || moboText.includes('b550') || moboText.includes('a320');

    if ((isCpuIntel && isMoboAmd) || (isCpuAmd && isMoboIntel)) {
      errors.push("Incompatibilidad de marca/socket: El Procesador y la Tarjeta Madre no encajan (Intel vs AMD).");
    }
  }

  // Validar RAM vs Motherboard (DDR3 / DDR4 / DDR5)
  if (ram && mobo) {
    const ramText = (ram.name + " " + (ram.description || "")).toLowerCase();
    const moboText = (mobo.name + " " + (mobo.description || "")).toLowerCase();

    if (ramText.includes('ddr4') && (moboText.includes('ddr5') || moboText.includes('ddr3'))) {
      errors.push("Incompatibilidad: Estás intentando poner RAM DDR4 en una placa no compatible.");
    } else if (ramText.includes('ddr5') && (moboText.includes('ddr4') || moboText.includes('ddr3'))) {
      errors.push("Incompatibilidad: Estás intentando poner RAM DDR5 en una placa no compatible.");
    } else if (ramText.includes('ddr3') && (moboText.includes('ddr4') || moboText.includes('ddr5'))) {
      errors.push("Incompatibilidad: Estás intentando poner RAM DDR3 en una placa no compatible.");
    }
  }
  return errors;
};