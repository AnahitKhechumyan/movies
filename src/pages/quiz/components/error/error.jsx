import "./error.css";
import { GiFireBomb } from "react-icons/gi";

export function Error() {
  return (
    <p className="error">
      <span><GiFireBomb /></span> There was an error fecthing questions.
    </p>
  );
}