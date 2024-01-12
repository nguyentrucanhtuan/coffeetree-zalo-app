import React from "react";
import { Header } from "zmp-ui";
import { Box, Divider, Typography } from "@mui/material";
import { folder_image_url } from "../recoil-state/setting";
import { useParams } from "react-router-dom";
import { postPublicListState } from "../recoil-state/post-state";
import { useRecoilValue } from "recoil";

export default function PostPage() {

  const { postId } = useParams();
  const postList = useRecoilValue(postPublicListState);
  const currentPost = postList.find(
    (item) => Number(item.id) === Number(postId),
  );

  return (
    <>
      <Header title="Nội dung bài viết" />
      <Box sx={{ marginBottom: "55px", marginTop: "43px" }}>
        <img
          src={folder_image_url + currentPost.image}
          style={{ width: "100%" }}
        />
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h5" sx={{ marginBottom: "10px" }}>
            {currentPost.name}
          </Typography>
          <Typography variant="h6">
            {currentPost.description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "10px" }}>
            <div dangerouslySetInnerHTML={{__html: currentPost.content}} />
        </Box>
      </Box>
    </>
  );
}
