import { memo } from "react";
import Map from "./map";

const Index = () => {
  return (
    <div>
      메인-페이지ㅡ!
    </div>
  )
}

export default {
  Index: memo(Index),
  Map: memo(Map),
};