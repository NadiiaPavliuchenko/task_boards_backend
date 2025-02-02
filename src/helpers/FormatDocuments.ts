export function formatDocuments<
  T extends {
    _id: any;
    todo?: any[];
    inProgress?: any[];
    done?: any[];
  }
>(
  data: T | T[]
):
  | (T & {
      _id: string;
      todo?: string[];
      inProgress?: string[];
      done?: string[];
    })
  | (T & {
      _id: string;
      todo?: string[];
      inProgress?: string[];
      done?: string[];
    })[] {
  if (Array.isArray(data)) {
    return data.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      ...(doc.todo && { todo: doc.todo.map((id) => id.toString()) }),
      ...(doc.inProgress && {
        inProgress: doc.inProgress.map((id) => id.toString())
      }),
      ...(doc.done && { done: doc.done.map((id) => id.toString()) })
    }));
  } else {
    return {
      ...data,
      _id: data._id.toString(),
      ...(data.todo && { todo: data.todo.map((id) => id.toString()) }),
      ...(data.inProgress && {
        inProgress: data.inProgress.map((id) => id.toString())
      }),
      ...(data.done && { done: data.done.map((id) => id.toString()) })
    };
  }
}
