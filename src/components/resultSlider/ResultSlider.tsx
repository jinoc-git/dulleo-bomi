import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Arrow, AutoPlay, Pagination, Perspective } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import slider01 from '../../assets/slider01.jpg';
import slider02 from '../../assets/slider02.jpg';
import slider03 from '../../assets/slider03.jpg';
import * as St from './style';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const ResultSlider = ({ roadName }: { roadName: string }) => {
  const _plugins = [new Perspective({ rotate: 0.5 })];

  const navigate = useNavigate();
  const goToSearchRouteList = useCallback((road: string) => {
    navigate('/result', { state: { roadName: road } });
    window.scrollTo(0, 700); //ref?
  }, []);

  return (
    <St.SliderContainer>
      <Flicking panelsPerView={3} align="center" circular={true} plugins={_plugins}>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('서해랑길')}>
          <img src={slider01} alt="" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('남파랑길')}>
          <img src={slider02} alt="" />
          <div>
            신비로운 해남을 걷는
            <p>남파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('해파랑길')}>
          <img src={slider03} alt="" />
          <div>
            송지호 해변을 따라 걷는
            <p>해파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('서해랑길')}>
          <img src={slider01} alt="" />
          <div>
            노을색 물감으로 물든
            <p>서해랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('남파랑길')}>
          <img src={slider02} alt="" />
          <div>
            신비로운 해남을 걷는
            <p>남파랑길</p>
          </div>
        </St.SliderItem>
        <St.SliderItem className="card-panel" onClick={() => goToSearchRouteList('해파랑길')}>
          <img src={slider03} alt="" />
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
