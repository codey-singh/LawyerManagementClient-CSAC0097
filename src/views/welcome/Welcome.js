import React from "react";

import LocalStorageService from "../../_shared/services/LocalStorageService";

function Welcome() {
  const name = LocalStorageService.getValue("name");

  return <h1>Welcome, {name}</h1>;
}

export default Welcome;
