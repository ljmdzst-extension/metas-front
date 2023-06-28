import React from "react";
import CardYear from "../components/CardYear";
export default function Main() {
  return (
    <>
      <div className="ConteinerMain">
        <div className="ConteinerCards">
          <CardYear title={"2022"} id={1}></CardYear>
          <CardYear title={"2023"} id={2}></CardYear>
        </div>
      </div>
    </>
  );
}
