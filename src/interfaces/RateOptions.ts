export interface IRateOptions {
  state: string;
  price: number;
  loan_amount: number;
  down_payment_amount: number;
  down_payment_amount_percent: number;
  minfico : number;
  maxfico : number;
  rate_structure: string;
  loan_type : string;
  loan_term : number;
  arm_type : string;
}
