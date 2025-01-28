import { useForm } from "react-hook-form";
import "./FormElements.css";

interface IFormInputs {
  grouping: "none" | "week" | "requestor" | "building" | "room" | "diagnoses";
  layout: "list" | "chart";
  termStart: string | null;
  termEnd: string | null;
  building: string | null;
  room: string | null;
  requestor: Array<string> | null;
  diagnoses: Array<string> | null;
  titleSubstring: string | null;
  matchAllDiagnoses: boolean | null;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div
        className="form-group grid grid-flow-col gap-1 grid-rows-10 [&>select]:bg-light-gray
        [&>input]:bg-light-gray [&>input]:px-2"
      >
        <label htmlFor="layout">Layout</label>
        <select {...register("layout")}>
          <option value="list">List</option>
          <option value="chart">Chart</option>
        </select>
        <label htmlFor="grouping">Grouping</label>
        <select {...register("grouping")}>
          <option value="week">Week</option>
          <option value="requestor">Requestor</option>
          <option value="building">Building</option>
          <option value="room">Room</option>
          <option value="diagnoses">Diagnoses</option>
          <option value="none">None</option>
        </select>
        <label htmlFor="termStart">Term Start</label>
        <input type="date" {...register("termStart")} />
        <label htmlFor="termEnd">Term End</label>
        <input type="date" {...register("termEnd")} />
        <label htmlFor="building">Building</label>
        <input {...register("building")} />
        <label htmlFor="room">Room</label>
        <input {...register("room")} />
        <label htmlFor="requestor">Requestor</label>
        <input {...register("requestor")} />
        <label htmlFor="titleSubstring">Title Search</label>
        <input {...register("titleSubstring")} />
        <label htmlFor="diagnoses">Diagnoses</label>
        <input {...register("diagnoses")} />
        <label htmlFor="matchAllDiagnoses">Match All Diagnoses</label>
        <input {...register("matchAllDiagnoses")} />
      </div>
      <button className="border-2 border-gray-600 p-1 my-1 w-50" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
