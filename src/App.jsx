import { useState } from "react";
import { useFormInput } from "./hooks/useFormInput";
import { useFetch } from "./hooks/useFetch";
import axios from "axios";

const getApiData = async () => {
  const data = await axios("http://localhost:3000/projects");
  return data?.data;
};
export default function Form() {

  const { isFetching, fetchedData, setFetchedData, error } = useFetch(getApiData , null);


  const firstNameProps = useFormInput("lalalal");
  const lastNameProps = useFormInput("lalalal");

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>

      {fetchedData && fetchedData?.map(el => {
        return <p> {el.title}</p>
      })}


      <button onClick={() => setFetchedData("")}>Clear Data</button>
      <p>
        <b>


          Good morning, {firstNameProps?.value} {lastNameProps?.value}.
        </b>
      </p>
    </>
  );
}
