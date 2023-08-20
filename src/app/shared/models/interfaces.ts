export interface IBudget {
  id: string;
  title: string;
  amount: number;
  max: number;
  timespan: string | undefined;
  expenses: IExpense[];
}

export interface IExpense {
  id: string;
  date: string;
  title: string;
  amount: number;
}
