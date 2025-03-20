import { IFormInputs } from "./types";

const url = import.meta.env.VITE_API_URL;

// POST Endpoints
const fetchFilteredTickets = async ({
  token,
  filter,
}: {
  token: string | null;
  filter: IFormInputs | null;
}) => {
  if (!token || !filter) {
    throw new Error("Token and filter are required");
  }

  const response = await fetch(`${url}/api/tickets/fetch-filtered-tickets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter: filter }),
  }).then((response) => response.json());

  return response;
};

// TODO: Implement deleteConfig and refactor
const deleteConfig = () => {};

// TODO: Implement saveConfig and refactor
const saveConfig = () => {};

// TODO: Implement refreshReport and refactor
const refreshReport = () => {};

// GET Endpoints
const getBuildings = async (token: string | null) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const data = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tickets/buildings`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((response) => response.json());

  if (!data) {
    throw new Error("Failed to fetch buildings");
  }

  return data;
};

// TODO: Implement getViewConfigs and refactor
const getViewConfigs = () => {};

const getRequestors = async (token: string | null) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const data = await fetch(`${url}/api/tickets/requestors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  if (!data) {
    throw new Error("Failed to fetch requestors");
  }

  const options = data.map((option: { requestor: string }) => ({
    label: option.requestor,
    value: option.requestor,
  }));

  return options;
};

const getDiagnoses = async (token: string | null) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const data = await fetch(`${url}/api/tickets/diagnoses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  if (!data) {
    throw new Error("Failed to fetch diagnoses");
  }

  const options = data.map((option: { value: string }) => ({
    label: option.value,
    value: option.value,
  }));

  return options;
};

const getReportGenerationTime = async (token: string | null) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const data = await fetch(`${url}/api/tickets/report-cache-generation-time`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  if (!data) {
    throw new Error("Failed to fetch report generation time");
  }

  return data;
};

export default {
  fetchFilteredTickets,
  deleteConfig,
  saveConfig,
  refreshReport,
  getViewConfigs,
  getBuildings,
  getRequestors,
  getDiagnoses,
  getReportGenerationTime,
};
