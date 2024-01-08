import React from 'react';

import WidgetWeather from './Widgets/widgetWeather'
import WidgetMorpion from './Widgets/widgetMorpion';
import WidgetCalendar from './Widgets/widgetCalendar';
import WidgetMap from './Widgets/widgetMap'
import WidgetNews from './Widgets/widgetNews';
import WidgetYoutube from './Widgets/widgetYoutube'
import WidgetNasa from './Widgets/widgetNasa';
import WidgetMemory from './Widgets/widgetMemory';
import WidgetCoinFlip from './Widgets/widgetCoinFlip';
import WidgetBall from './Widgets/widgetBall';
import WidgetPower4 from './Widgets/widgetPower4';
import WidgetAnniversary from './Widgets/widgetAnniversary';
import WidgetCps from './Widgets/widgetCps';

function getComponentByWidgetKey(widgetKey, setModalMorpion, setModalCalendar, setModalMap, setModalNews, setModalYoutube, setModalMemory, setModalCoinFlip, setModalBall, setModalPower4, setModalAnniversary, setModalCps, dataWeather, localisation, widgetToNotDisplay) {

    switch (widgetKey) {
      case 'morpion':
        return <WidgetMorpion key={widgetKey} updState={() => {widgetToNotDisplay('morpion')}} changeModalMorpion={(value) => {setModalMorpion(value)}}/>;
      case 'calendar':
        return <WidgetCalendar key={widgetKey} updState={() => {widgetToNotDisplay('calendar')}} changeModalCalendar={(value) => {setModalCalendar(value)}} />;
      case 'map':
        return <WidgetMap key={widgetKey} updState={() => {widgetToNotDisplay('map')}} changeModalMap={(value) => {setModalMap(value)}} location={localisation}/>;
      case 'weather':
        return <WidgetWeather key={widgetKey} updState={() => {widgetToNotDisplay('weather')}} data={dataWeather}/>;
      case 'nasa':
        return <WidgetNasa key={widgetKey} updState={() => {widgetToNotDisplay('nasa')}}/>;
      case 'news':
        return <WidgetNews key={widgetKey} updState={() => {widgetToNotDisplay('news')}} changeModalNews={(value) => {setModalNews(value)}}/>
      case 'youtube':
        return <WidgetYoutube key={widgetKey} updState={() => {widgetToNotDisplay('youtube')}} changeModalYoutube={(value) => {setModalYoutube(value)}}/>
      case 'memory':
        return <WidgetMemory key={widgetKey} updState={() => {widgetToNotDisplay('memory')}} changeModalMemory={(value) => {setModalMemory(value)}}/>
      case 'coinflip':
        return <WidgetCoinFlip key={widgetKey} updState={() => {widgetToNotDisplay('coinflip')}} changeModalCoinFlip={(value) => {setModalCoinFlip(value)}}/>
      case 'ball':
        return <WidgetBall key={widgetKey} updState={() => {widgetToNotDisplay('ball')}} changeModalBall={(value) => {setModalBall(value)}}/>
      case 'power4':
        return  <WidgetPower4 key={widgetKey} updState={() => {widgetToNotDisplay('power4')}} changeModalPower4={(value) => {setModalPower4(value)}}/>
      case 'anniversary':
        return <WidgetAnniversary key={widgetKey} updState={() => {widgetToNotDisplay('anniversary')}} changeModalAnniversary={(value) => {setModalAnniversary(value)}}/>
      case 'cps':
        return  <WidgetCps key={widgetKey} updState={() => {widgetToNotDisplay('cps')}} changeModalCps={(value) => {setModalCps(value)}}/>
        default:
        return null;
    }
}

export default getComponentByWidgetKey