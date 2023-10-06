'use client'
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Radio from '@mui/material/Radio';
import Avatar from '@mui/material/Avatar';
import { useRecoilValue } from 'recoil';
import { paymentMethodListState } from '../recoil-state/payment-state';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function paymentMethod() {

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const listPaymentMethod = useRecoilValue(paymentMethodListState);
  console.log('listPaymentMethod', listPaymentMethod)

  const folder_image_url = "http://localhost:81/storage/";

  return (
    <>
      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <RadioGroup
          defaultValue="1"
          name="payment-raido-group"
        >
          {listPaymentMethod.map((payment, index) => {
            return (
              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", paddingBottom: "10px" }}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <img src={folder_image_url + payment.image} width="40" height="40" />
                  </Box>
                  <Box sx={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    <Typography variant='subtitle2'>{payment.name} </Typography>
                  </Box>
                </Box>
                <Box sx={{ paddingRight: "10px" }}  >
                  <FormControlLabel value={payment.id} control={<Radio />} label="" sx={{ paddingRight: "0px" }} />
                </Box>
              </Box>
            )
          })}
        </RadioGroup>
      </List>

    </>
  );
}