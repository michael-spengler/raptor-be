function parseValue(v: string): string | number | boolean {
  if (v === "") {
    return true;
  } else if (v === "true") {
    return true;
  } else if (v === "false") {
    return false;
  } else if (!isNaN(Number(v))) {
    return +v;
  }
  return v;
}

export default parseValue;