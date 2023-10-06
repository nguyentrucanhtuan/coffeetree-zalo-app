import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useRecoilValue } from 'recoil';
import { cartState } from '../recoil-state/cart-state';

export default function MediaControlCard() {

    const currencyFormat = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const cartList = useRecoilValue(cartState);

    const folder_image_url = "http://localhost:81/storage/";

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {cartList.map((item: any, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ paddingTop: '4px', paddingBottom: "4px" }}>
                    <Card sx={{ display: 'flex', width: "100%" }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 80, height: 80 }}
                            image={folder_image_url + item.images}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ padding: "0px", paddingTop: "8px", paddingLeft: "15px", flex: '1 0 auto' }}>
                                <Typography component="div" variant="subtitle2">
                                    {item.name} x {item.quantity}
                                </Typography>

                                <Typography component="div" variant="caption">
                                    {item.addTopping.map((topping : any, i : number) => {
                                        return (
                                            <Typography key={i} variant="caption">{topping.name} - </Typography>
                                        )
                                    })}
                                </Typography>

                                <Typography variant="caption" color="text.secondary" component="div">
                                    {currencyFormat.format(item.price)}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}