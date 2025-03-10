import { Controller, useForm } from "react-hook-form";
import "./FormElements.css";
import Button from "@/components/Button";
import { ChartColumn } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { IFormInputs } from "@/types";
import StyledMultiSelect from "./MultiSelect";

const Form = ({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<IFormInputs>>;
}) => {
  const { token } = useAuth();
  const [buildingOptions, setBuildingOptions] = useState([
    {
      label: "",
      value: "",
    },
  ]);
  const [requestorOptions, setRequestorOptions] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [diagnosisOptions, setDiagnosisOptions] = useState([
    { label: "", value: "" },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      layout: "chart",
      building: [],
      requestor: [],
      diagnoses: [],
    },
  });

  // watches for conditional form rendering
  const watchLayout = watch("layout");
  const watchGrouping = watch("grouping");

  const handleFormSubmit = async (filter: IFormInputs) => {
    console.log(filter);
    setFilter(filter);
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/save-config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ config: filter }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    // set building options based on data found in report
    if (!token) {
      console.log("No token.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/buildings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.map((entry: { building: string }) => {
          if (entry.building === "") {
            return {
              value: "",
              label: "Unspecified Building",
            };
          }
          return { value: entry.building, label: entry.building };
        });
      })
      .then((options) => setBuildingOptions(options));

    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/diagnoses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.map((entry: { value: string }) => {
          return { value: entry.value, label: entry.value };
        });
      })
      .then((options) => setDiagnosisOptions(options));
    // fetch and set requestor options
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/requestors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.map((entry: { requestor: string }) => {
          return { value: entry.requestor, label: entry.requestor };
        });
      })
      .then((options) => setRequestorOptions(options));
  }, [token]);

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <Button type="submit">
        Generate view
        <ChartColumn width={22} />
      </Button>
      <div
        className="grid grid-cols-2 gap-2 min-w-[400px] [&_select]:bg-light-gray
        [&_input]:bg-light-gray [&_input]:px-2 [&_select]:h-8 [&_input]:h-8 [&_label]:pt-2"
      >
        <div id="display-options" className="form-group flex flex-col">
          <h3 className="justify-self-center pt-3 mb-0">Display</h3>
          <hr className="my-1" />
          <label htmlFor="layout">Layout</label>
          <select {...register("layout")}>
            <option value="chart">Chart</option>
            <option value="list">List</option>
          </select>
          <label htmlFor="grouping">Grouping</label>
          <select {...register("grouping")}>
            <option value="building">Building</option>
            <option value="week">Week</option>
            <option value="requestor">Requestor</option>
            <option value="room">Room</option>
            <option value="diagnoses">Diagnoses</option>
            {watchLayout === "list" && <option value="none">None</option>}
          </select>
        </div>
        <div id="filter-options" className="form-group flex flex-col">
          <h3 className="justify-self-center pt-3 mb-0">Filters</h3>
          <hr className="my-1" />
          <label htmlFor="termStart">Term Start</label>
          <input
            type="date"
            {...register("termStart")}
            required={watchGrouping === "week"}
          />
          <label htmlFor="termEnd">Term End</label>
          <input type="date" {...register("termEnd")} />
          {watchGrouping !== "building" && (
            <>
              <label htmlFor="building">Building</label>
              <Controller
                name="building"
                control={control}
                render={({ field }) => (
                  <StyledMultiSelect {...field} options={buildingOptions} />
                )}
              />
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

              <Controller
                name="requestor"
                control={control}
                render={({ field }) => (
                  <StyledMultiSelect {...field} options={requestorOptions} />
                )}
              />
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
                  <StyledMultiSelect {...field} options={diagnosisOptions} />
                )}
              />
            </>
          )}
          {watchGrouping !== "diagnoses" && (
            <>
              <label className="cursor-pointer">
                <span>
                  Only include tickets with <strong>ALL</strong> tagged
                  diagnoses:
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
      </div>
    </form>
  );
};

export default Form;
