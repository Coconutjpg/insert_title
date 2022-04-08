import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default class Carousel extends React.Component{



render(){
  return(
    <Swiper
    // install Swiper modules
    spaceBetween={0}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    loop={true}
    autoplay={
     { delay:3000,
      disableOnInteraction:false}
    }

  >
    <SwiperSlide>
      <img src ="https://e-10457.adzerk.net/r?e=eyJ2IjoiMS4xMCIsImF2Ijo4MjM1NTIsImF0Ijo1LCJidCI6MCwiY20iOjk0ODU5NTcsImNoIjo0NTE2MywiY2siOnt9LCJjciI6NTQ4ODk2NTksImRpIjoiYTUzNTE2ZWMyNjYwNGE5MmJmZjEwZWY2YWUwNzkyODQiLCJkaiI6MCwiaWkiOiIzZDIwYzg4NWY1MWU0ZTBkYWE4MTgwODVjMGY4N2UxMCIsImRtIjozLCJmYyI6OTEyODEwMjcsImZsIjo1NTg0ODY4NCwiaXAiOiIxNTQuMTE3LjE0OS4xODYiLCJudyI6MTA0NTcsInBjIjowLCJvcCI6MCwiZWMiOjAsImdtIjowLCJlcCI6bnVsbCwicHIiOjIwODI4MywicnQiOjEsInJzIjo1MDAsInNhIjoidW5kZWZpbmVkIiwic2IiOiJpLTA0NTBhYjk4ODQ2Yjc1OTE4Iiwic3AiOjIwMzc2Niwic3QiOjExMjE5NTQsInVrIjoiOTI3ZWY4YzAtYWY5Ny0xMWVjLThhMDktNmRhNzY0NzdkMGE4Iiwiem4iOjI0MTM0OCwidHMiOjE2NDk0MjU1MzMwOTEsInBuIjoic2VhcmNoLWluLWZlZWQiLCJnciI6dHJ1ZSwiZ2MiOnRydWUsImdDIjp0cnVlLCJncyI6Im5vbmUiLCJ0eiI6IkFtZXJpY2EvTmV3X1lvcmsiLCJ1ciI6Imh0dHBzOi8vdW5zcGxhc2guY29tL2Jsb2cvYWR2ZXJ0aXNlLW9uLXVuc3BsYXNoLyJ9&s=QhBR5KJzwIfkL3WMXnkKp11ovhY" style={{width:"100%"}}/>
    </SwiperSlide>
    <SwiperSlide>
      <img src ="https://e-10457.adzerk.net/r?e=eyJ2IjoiMS4xMCIsImF2Ijo4MjM1NTIsImF0Ijo1LCJidCI6MCwiY20iOjk0ODU5NTcsImNoIjo0NTE2MywiY2siOnt9LCJjciI6NTQ4ODk2NTksImRpIjoiYTUzNTE2ZWMyNjYwNGE5MmJmZjEwZWY2YWUwNzkyODQiLCJkaiI6MCwiaWkiOiIzZDIwYzg4NWY1MWU0ZTBkYWE4MTgwODVjMGY4N2UxMCIsImRtIjozLCJmYyI6OTEyODEwMjcsImZsIjo1NTg0ODY4NCwiaXAiOiIxNTQuMTE3LjE0OS4xODYiLCJudyI6MTA0NTcsInBjIjowLCJvcCI6MCwiZWMiOjAsImdtIjowLCJlcCI6bnVsbCwicHIiOjIwODI4MywicnQiOjEsInJzIjo1MDAsInNhIjoidW5kZWZpbmVkIiwic2IiOiJpLTA0NTBhYjk4ODQ2Yjc1OTE4Iiwic3AiOjIwMzc2Niwic3QiOjExMjE5NTQsInVrIjoiOTI3ZWY4YzAtYWY5Ny0xMWVjLThhMDktNmRhNzY0NzdkMGE4Iiwiem4iOjI0MTM0OCwidHMiOjE2NDk0MjU1MzMwOTEsInBuIjoic2VhcmNoLWluLWZlZWQiLCJnciI6dHJ1ZSwiZ2MiOnRydWUsImdDIjp0cnVlLCJncyI6Im5vbmUiLCJ0eiI6IkFtZXJpY2EvTmV3X1lvcmsiLCJ1ciI6Imh0dHBzOi8vdW5zcGxhc2guY29tL2Jsb2cvYWR2ZXJ0aXNlLW9uLXVuc3BsYXNoLyJ9&s=QhBR5KJzwIfkL3WMXnkKp11ovhY" style={{width:"100%"}}/>
    </SwiperSlide>
    <SwiperSlide>
      <img src ="https://e-10457.adzerk.net/r?e=eyJ2IjoiMS4xMCIsImF2Ijo4MjM1NTIsImF0Ijo1LCJidCI6MCwiY20iOjk0ODU5NTcsImNoIjo0NTE2MywiY2siOnt9LCJjciI6NTQ4ODk2NTksImRpIjoiYTUzNTE2ZWMyNjYwNGE5MmJmZjEwZWY2YWUwNzkyODQiLCJkaiI6MCwiaWkiOiIzZDIwYzg4NWY1MWU0ZTBkYWE4MTgwODVjMGY4N2UxMCIsImRtIjozLCJmYyI6OTEyODEwMjcsImZsIjo1NTg0ODY4NCwiaXAiOiIxNTQuMTE3LjE0OS4xODYiLCJudyI6MTA0NTcsInBjIjowLCJvcCI6MCwiZWMiOjAsImdtIjowLCJlcCI6bnVsbCwicHIiOjIwODI4MywicnQiOjEsInJzIjo1MDAsInNhIjoidW5kZWZpbmVkIiwic2IiOiJpLTA0NTBhYjk4ODQ2Yjc1OTE4Iiwic3AiOjIwMzc2Niwic3QiOjExMjE5NTQsInVrIjoiOTI3ZWY4YzAtYWY5Ny0xMWVjLThhMDktNmRhNzY0NzdkMGE4Iiwiem4iOjI0MTM0OCwidHMiOjE2NDk0MjU1MzMwOTEsInBuIjoic2VhcmNoLWluLWZlZWQiLCJnciI6dHJ1ZSwiZ2MiOnRydWUsImdDIjp0cnVlLCJncyI6Im5vbmUiLCJ0eiI6IkFtZXJpY2EvTmV3X1lvcmsiLCJ1ciI6Imh0dHBzOi8vdW5zcGxhc2guY29tL2Jsb2cvYWR2ZXJ0aXNlLW9uLXVuc3BsYXNoLyJ9&s=QhBR5KJzwIfkL3WMXnkKp11ovhY" style={{width:"100%"}}/>
    </SwiperSlide>
    
  </Swiper>
  );
}
}
