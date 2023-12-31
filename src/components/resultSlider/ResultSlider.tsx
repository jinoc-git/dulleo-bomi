import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Perspective } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import slider01 from '../../assets/slider01.jpg';
import slider02 from '../../assets/slider02.jpg';
import slider03 from '../../assets/slider03.jpg';
import * as St from './style';

type ResultSliderProps = {
  setSelectKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const ResultSlider = ({ setSelectKeyword, setSearchKeyword }: ResultSliderProps) => {
  const _plugins = [new Perspective({ rotate: 0.5 })];

  const goToSearchRouteList = (road: string) => {
    setSelectKeyword(road);
    setSearchKeyword('');
  };

  return (
    <St.SliderContainer>
      <Flicking panelsPerView={3} align="center" circular={true} plugins={_plugins}>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('서해랑길')}>
          <img src={slider01} alt="서해랑길" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('남파랑길')}>
          <img src={slider02} alt="남파랑길" />
          <div>
            신비로운 해남을 걷는
            <p>남파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('해파랑길')}>
          <img src={slider03} alt="해파랑길" />
          <div>
            송지호 해변을 따라 걷는
            <p>해파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('서해랑길')}>
          <img src={slider01} alt="서해랑길" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('남파랑길')}>
          <img src={slider02} alt="남파랑길" />
          <div>
            신비로운 해남을 걷는
            <p>남파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('해파랑길')}>
          <img src={slider03} alt="해파랑길" />
          <div>
            송지호 해변을 따라 걷는
            <p>해파랑길</p>
          </div>
        </St.SliderItem>
      </Flicking>
    </St.SliderContainer>
  );
};

export default ResultSlider;
