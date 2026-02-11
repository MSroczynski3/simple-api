export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoRow {
  id: string;
  title: string;
  description: string | null;
  completed: number;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  error: {
    code: "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
    message: string;
    details?: unknown;
  };
}
