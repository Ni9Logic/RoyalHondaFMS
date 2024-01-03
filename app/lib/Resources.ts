import { Invoice } from "@/types";

export const InvoiceData: Invoice = {
    InvoiceType: '',
    InsuranceName: '',
    InsuranceNTN: '',
    InsuranceGSTR: '',
    SurveyorName: '',
    DriverUser: '',
    CarMake: '',
    CarModel: '',
    CarRegNum: '',
    PaymentMode: '',
    PartsTable: {},
    TAmountPart: 0,
    GSTPercent: 0,
    GSTCost: 0,
    TAmountGST: 0, // TAmountParts + GSTCost
    DepPercent: 0,
    TAmountDep: 0, // TAmountDep - TAmountGST
    EstimateNum: 0, // With Help of Estimate Number you can Put TLaborAmount from that Estimate 
    TLaborAmount: 0,
    PSTPercent: 0,
    PSTCost: 0, // PSTPercent of TLaborAmount
    TLaborAmountPST: 0, // TLaborAmount + PSTCost
    GrandTAmount: 0, // TAmountDep + TLaborAmountPST
    LossNumber: '', // Because this shall be unique and user can also leave it empty so we give this a unique id in case user leaves this empty
    CreatedAt: '',
}