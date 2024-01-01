export interface EstimateRowType {
    partNo: string;
    partDesc: string;
    partQty: number;
    partPrice: number;
    partTotalPrice: number;
}
export interface EstimateRowObject {
    [key: string]: EstimateRowType;
};

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
    cSurveyorNTN: string;
    cDriverUser: string;
    Insurance: string;
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
    cSurveyorNTN: string;
}

export interface SearchEstimate {
    id: number;
}