export function isLoggedIn() {
  return localStorage.getItem("id") ? true : false;
}

export function isVosAuthenticated() {
  return localStorage.getItem("isVosAuthenticated") ? true : false;
}

export function filter(array, value) {
  return array.filter((o) =>
    Object.keys(o).some((k) =>
      String(o[k]).toLowerCase().includes(value.toLowerCase())
    )
  );
}
