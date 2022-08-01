import { useNavigate } from "react-router-dom"
import Buttons from "../components/buttons"

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Buttons.Main text="메인" handleClick={() => navigate('/', {
        replace: false,
      })} />
      <Buttons.Main text="지도" handleClick={() => navigate('/map', {
        replace: false,
      })} />
    </div>
  )
}