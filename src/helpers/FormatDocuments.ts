export function formatDocuments<T extends { _id: any; boardId?: any }>(
  data: T | T[]
):
  | (T & { _id: string; boardId?: string })
  | (T & { _id: string; boardId?: string })[] {
  if (Array.isArray(data)) {
    return data.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      ...(doc.boardId && { boardId: doc.boardId.toString() }) // Перетворюємо boardId, якщо він є
    }));
  } else {
    return {
      ...data,
      _id: data._id.toString(),
      ...(data.boardId && { boardId: data.boardId.toString() })
    };
  }
}
