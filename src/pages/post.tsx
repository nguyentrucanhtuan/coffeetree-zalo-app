import React from "react";
import { Header } from "zmp-ui";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { folder_image_url } from "../recoil-state/setting";
import { useParams } from "react-router-dom";
import { postPublicListState } from "../recoil-state/post-state";
import { useRecoilValue } from "recoil";
import { openChat } from "zmp-sdk";
import ChatIcon from '@mui/icons-material/Chat';

const zaloOAId = "1610121007405920472";

const openChatScreen = async () => {
  try {
    await openChat({
      type: "oa",
      id: zaloOAId,
      message: "Xin Chào, tôi muốn hỏi",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

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

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box sx={{ display: "flex" }}>

          
          <Button
            onClick={() => {
              openChatScreen();
            }}
            variant="outlined"
            size="large"
            startIcon={<ChatIcon />}
            sx={{ margin: "5px", width: "100%" }}
          >
            Nhắn tin với shop
          </Button>
        </Box>
      </Paper>
    </>
  );
}
