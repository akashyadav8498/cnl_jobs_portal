function stringIsEmpty(string) {
  if (
    string === "" ||
    string === "null" ||
    string == null ||
    string == undefined
  )
    return true;
  else return false;
}
