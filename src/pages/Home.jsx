import React from "react";
import Calendar from "../components/Calendar";
import { useAuth0 } from "@auth0/auth0-react";
function Home() {
  return (
    <div>
      <Calendar />
    </div>
  );
}
export default Home;
