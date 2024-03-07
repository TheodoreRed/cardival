export default interface Card {
  id: string;
  question: string;
  answer: string;
  attempts: number;
  successes: number;
  failures: number;
}
