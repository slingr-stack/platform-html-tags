export function isValidStyle(style: string | null) {
  const validStyles = [
    "regular",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
  ];
  return validStyles.includes(style || "");
}
