import React from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Header } from "zmp-ui";
import { postPublicListState } from "../recoil-state/post-state";
import { useNavigate } from "react-router-dom";
import { folder_image_url } from "../recoil-state/setting";

export default function PostFeatureById(props: any) {

    const navigate = useNavigate();
    const postId = props.postId;
    const postList = useRecoilValue(postPublicListState);
    const currentPost = postList.find(
        (item) => Number(item.id) === Number(postId),
    );

    return (
        <>
            <Header title="Công thức pha chế" />
            <Box sx={{ width: "100%", marginTop: "45px", padding: "10px" }}>
                    <Card 
                        sx={{ marginBottom: "10px" }} 
                        onClick={() => navigate(`/post/${postId}`)}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={folder_image_url + currentPost.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {currentPost.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {currentPost.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </Box>
        </>
    );
}
