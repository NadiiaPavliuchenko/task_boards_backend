import Board from "./board/Board";
import Card from "./card/Card";

type Controller = typeof Board | typeof Card;

const controllers: Controller[] = [Board, Card];

export { controllers };
