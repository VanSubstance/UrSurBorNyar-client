import { useNavigate } from "react-router-dom"
import Buttons from "../components/buttons"

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Buttons.Main text="메인" handleClick={() => navigate('/', {
        replace: false,
      })} />
      <Buttons.Main text="카카오 지도" handleClick={() => navigate('/maps/kakao', {
        replace: false,
      })} />
      <Buttons.Main text="네이버 지도" handleClick={() => navigate('/maps/naver', {
        replace: false,
      })} />
    </div>
  )
}