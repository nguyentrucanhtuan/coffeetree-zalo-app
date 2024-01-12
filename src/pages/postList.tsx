import React from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Header } from "zmp-ui";
import { postPublicListState } from "../recoil-state/post-state";
import { useNavigate } from "react-router-dom";
import { folder_image_url } from "../recoil-state/setting";

export default function PostListPage() {

    const postList = useRecoilValue(postPublicListState);
    const navigate = useNavigate();
    console.log(postList);
    return (
        <>
            <Header title="Công thức pha chế" />
            <Box sx={{ width: "100%", marginTop: "45px", padding: "10px" }}>
                {postList.map((post : any) => (
                    <Card 
                        key={post.id} 
                        sx={{ marginBottom: "10px" }} 
                        onClick={() => navigate(`/post/${post.id}`)}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={folder_image_url + post.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {post.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );
}
