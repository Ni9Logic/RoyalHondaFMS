export interface EstimateRowType {
  partNo: string;
  partDesc: string;
  partQty: number;
  partPrice: number;
  partTotalPrice: number;
}
export interface EstimateRowObject {
  [key: string]: EstimateRowType;
}

export interface ServicesDetailsType {
  details: string;
  charges: number;
}

export interface ServiceRowObject {
  [key: string]: ServicesDetailsType;
}

export interface EstimateForm {
  id: number;
  cName: string;
  jobId: string;
  cMake: string;
  cModel: string;
  cSurveyor: string;
  cDriverUser: string;
  Insurance: string;
  NTN: string;
  GSTR: string;
  EstimateTableData: EstimateRowObject;
  ServicesDetailsTableData: ServiceRowObject;
  DiscountServices: number;
  DiscountEstimate: number;
  DiscountServicesFigure: number;
  DiscountEstimateFigure: number;
  TotalServiceFee: number;
  TotalEstimateFee: number;
  cKiloMeters: number;
  CreatedAt: string;
  cRegistration: string;
  PaymentMode: string;
  OverAllAmount: number;
  isRoyal: boolean;
}

export interface Surveyor {
  id: number;
  cSurveyor: string;
}

export interface SearchEstimate {
  id: number;
}
export type JOBFormData = {
  SerialNo?: number;
  CustomerName: string;
  DriverUser: string;
  CellNo: string;
  Make: string;
  Model: string;
  JobCheckedBy: string;
  WorkType: string;
  Insurance: string;
  NTN: string;
  GSTR: string;
  Status: string;
  RegistrationNumber: string;
  RequiredWorkDetails: string;
  OtherAdditionalWork: string;
  Fuel: string;
  Mileage: string;
  Lighter: boolean;
  Ashtray: boolean;
  FloorMats: boolean;
  OriginalBook: boolean;
  SeatCovers: boolean;
  RadioAntena: boolean;
  SpareWheel: boolean;
  WheelRod: boolean;
  JackHandle: boolean;
  Tools: boolean;
  ExtraThings: boolean;
  FrameNo: string;
  BatteryNumber: string;
  InReceivedBy: string;
  InReceivedFrom: string;
  InTime: string;
  OutReceivedBy: string;
  OutReceivedFrom: string;
  OutTime: string;
  surelyCreate?: boolean;
};

export type InsuranceCompaniesData = {
  name: string;
  NTN: string?;
  GSTR: string;
};
