import { memo } from "react";
import NotFound from "./404";
import Map from "./maps";

const Index = () => {
  return (
    <div>
      메인-페이지ㅡ!
    </div>
  )
}

export default {
  Index: memo(Index),
  NotFound: memo(NotFound),
  Maps: Map,
};