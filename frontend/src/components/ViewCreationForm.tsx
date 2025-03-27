import { Controller, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./FormElements.css";
import Button from "@/components/Button";
import { ChartColumn } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import type { IFormInputs } from "@/types";
import api from "@/api";
import StyledMultiSelect from "./MultiSelect";

const Form = ({
  filter,
  setFilter,
}: {
  filter: IFormInputs;
  setFilter: Dispatch<SetStateAction<IFormInputs>>;
}) => {
  const { token } = useAuth();

  const defaultOptions = [
    {
      value: "",
      label: "",
    },
  ];

  const [buildingOptions, setBuildingOptions] = useState(defaultOptions);
  const [requestorOptions, setRequestorOptions] = useState(defaultOptions);
  const [diagnosisOptions, setDiagnosisOptions] = useState(defaultOptions);

  const [generateViewMessage, setGenerateViewMessage] = useState({
    message: "",
    error: "",
  });

  const { register, handleSubmit, resetField, watch, control, setValue } =
    useForm<IFormInputs>({});

  // watches for conditional form rendering
  const watchLayout = watch("layout");
  const watchGrouping = watch("grouping");
  const navigate = useNavigate();

  /* Clear out the field that is being grouped by
   */
  const clearFieldBeingGrouped = (filter: IFormInputs) => {
    // clear field being grouped
    if (filter.grouping === "building") {
      filter.building = [];
      resetField("room");
    } else if (filter.grouping === "room") {
      filter.room = "";
      filter.building = [];
      resetField("building");
    } else if (filter.grouping === "requestor") {
      filter.requestor = [];
      resetField("requestor");
    } else if (filter.grouping === "diagnoses") {
      filter.diagnoses = [];
      resetField("diagnoses");
    }
  }

  const handleFormSubmit = async (filter: IFormInputs) => {
    // re-navigate to page to clear filter state
    navigate("/new-view", { replace: true, state: {} });

    // set new filter
    clearFieldBeingGrouped(filter);
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
      .then((data) => {
        setGenerateViewMessage(data);
        setTimeout(() => {
          setGenerateViewMessage({ message: "", error: "" });
        }, 1500);
      });
  };

  useEffect(() => {
    // handle missing token
    if (!token) {
      console.log("No token.");
      return;
    }

    // on remount, check if current state has a passed in filter
    if (filter) {
      // dynamically set filter values
      setValue("layout", filter.layout);
      setValue("grouping", filter.grouping);
      setValue("diagnoses", filter.diagnoses);
      setValue("requestor", filter.requestor);
      setValue("building", filter.building);
      setValue("room", filter.room);
      setValue("termStart", filter.termStart);
      setValue("termEnd", filter.termEnd);
    }

    // populate building options with api call
    api
      .getBuildings(token)
      .then((data) => {
        // replace any empty strings with "Unspecified Building"
        const entries = data?.map((entry: { building: string }) => {
          if (entry.building === "") {
            return {
              value: "",
              label: "Unspecified Building",
            };
          }
          return { value: entry.building, label: entry.building };
        });

        return entries;
      })
      .then((options) => setBuildingOptions(options));

    // populate diagnosis options with api call
    api.getDiagnoses(token).then((options) => {
      setDiagnosisOptions(options);
    });

    // fetch and set requestor options
    api.getRequestors(token).then((options) => {
      setRequestorOptions(options);
    });
  }, [token, filter, setValue]);

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-row items-center">
        <Button type="submit">
          Generate view
          <ChartColumn width={22} />
        </Button>
        <span className="text-sm ml-1" hidden={!generateViewMessage}>
          {generateViewMessage?.message || generateViewMessage?.error}
        </span>
      </div>

      <div
        className="grid grid-cols-2 gap-2 min-w-[400px] [&_select]:bg-light-gray
        [&_input]:bg-light-gray [&_input]:px-2 [&_select]:px-2 [&_select]:h-[40px] [&_input]:h-[40px] [&_label]:pt-2"
      >
        <div id="display-options" className="form-group flex flex-col">
          <h3 className="justify-self-center pt-3 mb-0">Display</h3>
          <label>Layout</label>
          <select {...register("layout")}>
            <option value="chart">Chart</option>
            <option value="list">List</option>
          </select>
          <label>Grouping</label>
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
          <label>Term Start</label>
          <input
            type="date"
            {...register("termStart")}
            required={watchGrouping === "week"}
          />
          <label>Term End</label>
          <input type="date" {...register("termEnd")} />
          {watchGrouping !== "building" && (
            <>
              <label>Building</label>
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
              <label>Room</label>
              <input {...register("room")} />
            </>
          )}
          {watchGrouping !== "requestor" && (
            <>
              <label>Requestor</label>

              <Controller
                name="requestor"
                control={control}
                render={({ field }) => (
                  <StyledMultiSelect {...field} options={requestorOptions} />
                )}
              />
            </>
          )}
          {
            /*
              watchLayout === "list" && (
              <>
                <label>Title Search</label>
                <input {...register("titleSubstring")} />
              </>
            )
            */
          }
          {watchGrouping !== "diagnoses" && (
            <>
              <label>Diagnoses</label>
              <Controller
                name="diagnoses"
                control={control}
                render={({ field }) => (
                  <StyledMultiSelect {...field} options={diagnosisOptions} />
                )}
              />
            </>
          )}
          {
            /* watchGrouping !== "diagnoses" && (
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
          )
              */
              }
        </div>
      </div>
    </form>
  );
};

export default Form;
