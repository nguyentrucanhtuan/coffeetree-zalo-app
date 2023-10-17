'use client'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Box } from '@mui/material';

import { folder_image_url } from "../recoil-state/setting";

export default function Slider(props : any) {

  return (
    <Box sx={{padding: "10px"}}>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {props.listBanner.map((banner, index) => (
          <SwiperSlide key={index}>
            <img style={{borderRadius: "10px", width: "100%"}} src={folder_image_url + banner.images} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
