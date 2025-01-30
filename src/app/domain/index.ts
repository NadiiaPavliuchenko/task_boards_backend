import Board from "./board/Board";

type Controller = typeof Board;

const controllers = <Controller[]>[Board];

export { controllers };
