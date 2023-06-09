export interface IBudget {
  id: string;
  title: string;
  amount: number;
  max: number;
  expenses: IExpense[];
}

export interface IExpense {
  id: string;
  title: string;
  amount: number;
}
