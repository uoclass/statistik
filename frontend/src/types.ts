export interface AuthContextProps {
  token: string | null;
  setToken: (arg1: string) => void;
  username: string | null;
  setUsername: (arg1: string) => void;
}

export interface AuthProviderChildren {
  children: React.ReactNode;
}

export interface IconProps {
  icon: string;
  width: number;
  color?: string;
  className?: string;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface Ticket {
  id: number;
  ticket_id: string;
  title: string;
  assigned_to: string;
  requestor: string;
  email: string;
  department: string;
  location: string;
  room: string;
  created: string;
  modified: string;
  status: "Open" | "Closed";
  createdAt: Date;
  updatedAt: Date;
  diagnoses: [];
}

export interface IFormInputs {
  grouping: "none" | "week" | "requestor" | "building" | "room" | "diagnoses";
  layout: "list" | "chart";
  termStart?: string | null;
  termEnd?: string | null;
  building?: Array<{ value: string; label: string }> | [];
  room?: string | null;
  requestor?: Array<{ value: string; label: string }> | [];
  diagnoses?: Array<{ value: string; label: string }> | [];
  titleSubstring?: string | null;
  matchAllDiagnoses?: boolean | null;
}

export interface ConfigData {
  createdAt: string;
  id: number;
  updatedAt: string;
  userId: number;
  viewConfig: IFormInputs;
}

export interface ViewConfigsResponse {
  name: string;
  viewConfigs: Array<ConfigData>;
}
