export type Task = {
  id: string;
  title: string;
  category: string;
  method: { kind: string; quantity: number };
  often: { density: string; amount: boolean[] | number };
  color: string;
  startDate: { day: number; month: number; year: number };
  notification: string;
  completion: string;
};

export type Tasks = Task[];

export type Component = {
  name: string;
  title: string;
  icon: string;
};

export type Components = Component[];
