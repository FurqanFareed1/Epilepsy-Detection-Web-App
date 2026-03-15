export function detectSeizure(emgValue) {
  if (Math.abs(emgValue) > 0.9) return "POSSIBLE_SEIZURE";
  if (Math.abs(emgValue) > 0.6) return "HIGH_ACTIVITY";
  return "NORMAL";
}

export function getStatusColor(status) {
  switch (status) {
    case "POSSIBLE_SEIZURE":
      return "destructive";
    case "HIGH_ACTIVITY":
      return "warning";
    default:
      return "success";
  }
}

export function getStatusLabel(status) {
  switch (status) {
    case "POSSIBLE_SEIZURE":
      return "Possible Seizure";
    case "HIGH_ACTIVITY":
      return "High Activity";
    default:
      return "Normal";
  }
}

