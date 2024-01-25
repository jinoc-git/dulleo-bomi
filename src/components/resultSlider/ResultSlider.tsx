import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Perspective } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import slider01 from '../../assets/slider01.jpg';
import slider02 from '../../assets/slider02.jpg';
import slider03 from '../../assets/slider03.jpg';
import * as St from './style';
import React from 'react';

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

  const flicking = React.useRef<Flicking | null>(null);

  const handlePanelClick = (index: number) => {
    if (flicking.current) flicking.current.moveTo(index);

    if (index === 0 || index === 3) goToSearchRouteList('서해랑길');
    if (index === 1 || index === 4) goToSearchRouteList('남파랑길');
    if (index === 2 || index === 5) goToSearchRouteList('해파랑길');
  };

  return (
    <St.SliderContainer>
      <Flicking
        panelsPerView={3}
        align="center"
        circular={true}
        plugins={_plugins}
        ref={flicking}
        onSelect={(e) => handlePanelClick(e.index)}
      >
        <St.SliderItem className="card-panel">
          <img src={slider01} alt="서해랑길" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel">
          <img src={slider02} alt="남파랑길" />
          <div>
            신비로운 해남을 걷는
            <p>남파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel">
          <img src={slider03} alt="해파랑길" />
          <div>
            송지호 해변을 따라 걷는
            <p>해파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel">
          <img src={slider01} alt="서해랑길" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel">
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
