export type Task = {
  id: string;
  title: string;
  category: string;
  method: { kind: string; quantity: number };
  often: { density: string; amount: boolean[] | number };
  color: string;
  startDate: string;
  notification: string;
  completion: boolean;
};

export type Tasks = Task[];
