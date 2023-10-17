import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Typography } from '@mui/material';
import { useNavigate } from "react-router";
import { folder_image_url } from "../recoil-state/setting";

function FeatureList(props: any) {

    const navigate = useNavigate();

    const currencyFormat = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <Box m={1}>
            <Typography variant="h6" gutterBottom>
                Gợi ý cho bạn
            </Typography>
            <Swiper slidesPerView={1.25} spaceBetween={16}>
                {props.listFeature.map((feature) => (
                    <SwiperSlide key={feature.id}>
                        <Box onClick={() => navigate(`/product/${feature.id}`)}>
                            <img loading="lazy" style={{borderRadius: "5px", width: "100%" }} src={folder_image_url + feature.images} />
                            <Typography variant="subtitle2">
                                {feature.name}
                            </Typography>
                            {/* <Typography variant="caption">
                                Giảm 20%
                            </Typography> */}
                            <Typography variant="subtitle1" >
                                {currencyFormat.format(feature.price)}
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
export default FeatureList;