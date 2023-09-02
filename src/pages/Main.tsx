import CardYear from "../components/CardYear";
import { useSelector } from "react-redux";
import {RootState} from "../redux/store";
import { useAppDispatch, AppDispatch } from "../redux/store";
import { allProgramas } from "../redux/reducers/programReducer";
import {useEffect, useState} from "react";
export default function Main() {
  const dispatch: AppDispatch = useAppDispatch();
  useEffect(() => {
    dispatch(allProgramas())
  }, [dispatch]);

  return (
    <>
      <div className="ConteinerMain">
        <div className="ConteinerCards">
          {/* <CardYear title={"2022"}></CardYear> */}
          <CardYear title={"2023"}></CardYear>
        </div>
      </div>
    </>
  );
}
