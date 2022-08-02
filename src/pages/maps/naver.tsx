import { useCallback, useState } from "react";
import Buttons from "../../components/buttons";
import { coorsProps, NaverMap } from "../../components/imports/Map";
import api from "../../modules/api";
import { NaverClientId, NaverClientSecret } from "../../utils/keys";
import { OuterApiUrl } from "../../utils/urls";

const NaverMapPage = () => {
  const [startcoor, setStartCoor] = useState<coorsProps>({
    lat: 127.1058342,
    lng: 35.179470,
  });
  const [endCoor, setEndCoor] = useState<coorsProps>({
    lat: 129.075986,
    lng: 37.359708,
  });

  const handleAPI = useCallback(async () => {
    const resData = await api.Get(OuterApiUrl.naver.direction, {
      start: `${startcoor.lat},${startcoor.lng}`,
      goal: `${endCoor.lat},${endCoor.lng}`,
    }, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": NaverClientId,
        "X-NCP-APIGW-API-KEY": NaverClientSecret,
      }
    });
    console.log(resData);
    
  }, []);

  return (
    <div>
      <Buttons.Main text="경로 api 요청 보내보기" handleClick={handleAPI} />
      <NaverMap />
    </div>
  );
}

export default NaverMapPage;