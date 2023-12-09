export interface CreateTodoInput {
  title: string;
  user_id: number;
}

export interface UpdateTodoInput {
  title: string;
  completed: boolean;
  id: number;
  user_id: number;
}

export interface DeleteTodoInput {
  id: number;
  user_id: number;
}
