import { Controller, useForm } from "react-hook-form";
import "./FormElements.css";
import { useAuth } from "../provider/AuthProvider";
import { Dispatch, SetStateAction } from "react";
import { diagnosisOptions } from "./DiagnosisOptions";
import Select from "react-select";

export interface IFormInputs {
  grouping: "none" | "week" | "requestor" | "building" | "room" | "diagnoses";
  layout: "list" | "chart";
  termStart?: string | null;
  termEnd?: string | null;
  building?: string | null;
  room?: string | null;
  requestor?: Array<string> | null;
  diagnoses?: Array<string> | null;
  titleSubstring?: string | null;
  matchAllDiagnoses?: boolean | null;
}

const Form = ({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<IFormInputs>>;
}) => {
  const token = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();

  // watches for conditional form rendering
  const watchLayout = watch("layout", "chart");
  const watchGrouping = watch("grouping");

  const onSubmit = async (filter: IFormInputs) => {
    console.log(filter);
    setFilter(filter);
  };

  return (
    <form
      className="w-full justify-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="w-[400px] form-group flex flex-col [&>select]:bg-light-gray
        [&>input]:bg-light-gray [&>input]:px-2 [&>label]:pt-2"
      >
        <h3 className="justify-self-center pt-3 mb-0">Display</h3>
        <hr className="my-1" />
        <label htmlFor="layout">Layout</label>
        <select {...register("layout")}>
          <option value="chart">Chart</option>
          <option value="list">List</option>
        </select>
        <label htmlFor="grouping">Grouping</label>
        <select {...register("grouping")}>
          <option value="week">Week</option>
          <option value="requestor">Requestor</option>
          <option value="building">Building</option>
          <option value="room">Room</option>
          <option value="diagnoses">Diagnoses</option>
          {watchLayout === "list" && <option value="none">None</option>}
        </select>
        <h3 className="justify-self-center pt-3 mt-3 mb-0">Filters</h3>
        <hr className="my-1" />
        <label htmlFor="termStart">Term Start</label>
        <input type="date" {...register("termStart")} />
        <label htmlFor="termEnd">Term End</label>
        <input type="date" {...register("termEnd")} />
        {watchGrouping !== "building" && (
          <>
            <label htmlFor="building">Building</label>
            <input {...register("building")} />
          </>
        )}
        {watchGrouping !== "building" && watchGrouping !== "room" && (
          <>
            <label htmlFor="room">Room</label>
            <input {...register("room")} />
          </>
        )}
        {watchGrouping !== "requestor" && (
          <>
            <label htmlFor="requestor">Requestor</label>
            <input {...register("requestor")} />
          </>
        )}
        {watchLayout === "list" && (
          <>
            <label htmlFor="titleSubstring">Title Search</label>
            <input {...register("titleSubstring")} />
          </>
        )}
        {watchGrouping !== "diagnoses" && (
          <>
            <label htmlFor="diagnoses">Diagnoses</label>
            <Controller
              name="diagnoses"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={diagnosisOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      border: 0,
                      borderRadius: 0,
                      boxShadow: "none",
                      maxWidth: "400px",
                      backgroundColor: "rgb(222, 222, 222)",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "#192E49"
                        : "rgb(211, 211, 211)",
                      "&:hover": {
                        backgroundColor: "rgb(162, 164, 166)",
                      },
                      cursor: "pointer",
                    }),
                  }}
                />
              )}
            />
          </>
        )}
        {watchGrouping !== "diagnoses" && (
          <>
            <label className="cursor-pointer">
              <span>
                Only include tickets with <strong>ALL</strong> tagged diagnoses:
              </span>
              <input
                className="mx-1 place-self-center accent-red-500"
                type="checkbox"
                {...register("matchAllDiagnoses")}
              />
            </label>
          </>
        )}
      </div>
      <button
        className="border-2 border-gray-600 p-1 my-2 min-w-25"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
