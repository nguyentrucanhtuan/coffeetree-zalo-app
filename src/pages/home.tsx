import React from "react";
import { Divider, Box, Typography } from "@mui/material";

import Slider from "../components/slider";
import CollectionList from "../components/collectionList";
import FeatureList from "../components/featureList";
import ProductList from "../components/productList";

import { useRecoilValue } from "recoil";
import { collectionPublicListState } from "../recoil-state/collection-state";
import { productPublicListState } from "../recoil-state/product-state";
import { bannerListState } from "../recoil-state/banner-state";
import { featureListState } from "../recoil-state/feature-state";
import PostFeatureById from "../components/postFeatureById";

const HomePage = () => {
  const collectionList = useRecoilValue(collectionPublicListState);
  const productList = useRecoilValue(productPublicListState);
  const bannerList = useRecoilValue(bannerListState);
  const featureList = useRecoilValue(featureListState);

  return (
    <Box>
      <Slider listBanner={bannerList} />
      <CollectionList listCollection={collectionList} />
      <Divider style={{ borderWidth: "4px" }} />
      <FeatureList listFeature={featureList} />
      <Divider style={{ borderWidth: "4px" }} />
      <PostFeatureById postId={1} />
      <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Sản phẩm nổi bật
        </Typography>
      </Box>
      <ProductList listProduct={productList} />
    </Box>
  );
};

export default HomePage;
