import axios from "axios";

export const SMALL_DATA_API =
  "https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
export const BIG_DATA_API =
  "&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

// get small data packages
export async function getSmallData() {
  const response = await axios.get(
    "https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  );
  return response;
}

export async function getBigData() {
  const response = await axios.get(
    `https://www.filltext.com/?rows=1000${BIG_DATA_API}`
  );
  return response;
}

export function handleSortIcon(ascending) {
  if (ascending) return <b>&#8595;</b>;
  return <b>&#8593;</b>;
}

export function handleSort(data) {
  const asc = data.slice().sort((a, b) => a.id - b.id); // For ascending sort
  const desc = data.slice().sort((a, b) => b.id - a.id); // For descending sort
  console.log("asc", asc);
  console.log("desc", desc);
  return { ascending: asc, descending: desc };
}

export function handleFiltered(item, value = "") {
  const val = value && value.toLowerCase();
  if (!value || !item) return true;
  if (
    String(item.id).includes(val) ||
    item.firstName.toLowerCase().includes(val) ||
    item.lastName.toLowerCase().includes(val) ||
    item.email.toLowerCase().includes(val) ||
    item.phone.toLowerCase().includes(val)
  )
    return true;

  return false;
}
