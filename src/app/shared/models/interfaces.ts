export interface IBudget {
  id: string;
  title: string;
  amount: number;
  max: number;
  expenses: IExpense[];
  date: string;
}

export interface IExpense {
  id: string;
  date: string;
  title: string;
  amount: number;
}
