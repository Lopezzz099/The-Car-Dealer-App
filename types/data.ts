export type FieldError = {
  message?: string;
};

export type CarData = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type SelectProps = {
  selectedOption: SelectOptions | undefined;
  setSelectedOption: (option: SelectOptions | undefined) => void;
  errors: { [key: string]: FieldError } | undefined;
};

export type SelectOptions = {
  value: number;
  label: string;
};

export type FormData = {
  make: SelectOptions;
  year: SelectOptions;
};

export type Params = {
  makeId: string;
  year: string;
};
