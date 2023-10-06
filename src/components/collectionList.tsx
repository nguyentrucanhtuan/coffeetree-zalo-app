import React from 'react';
import { Grid , Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';

export default function CategoryList(props: any) {
    const navigate = useNavigate();
    const url_category_image = "http://localhost:81/storage/"
    return (
        <Box m={2} >
            <Typography variant="h6" gutterBottom>
                Danh mục sản phẩm
            </Typography>
            <Grid container spacing={2} mt={1}>
                {props.listCollection.map((collection)=> (
                    <Grid item xs={3} sx={{textAlign: 'center'}} key={collection.id} onClick={() => navigate(`/collection/${collection.id}`)}>
                        <img style={{width: '48px'}} src={url_category_image + collection.image} />
                        <Typography variant="subtitle2" gutterBottom>
                            {collection.name}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}