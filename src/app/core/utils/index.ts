export function filter(array, value) {
  return array.filter((o) =>
    Object.keys(o).some((k) =>
      String(o[k]).toLowerCase().includes(value.toLowerCase())
    )
  );
}
