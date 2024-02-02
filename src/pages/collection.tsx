import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Header } from "zmp-ui";

import ProductList from "../components/productList";
import { collectionPublicListState } from "../recoil-state/collection-state";
import { productsByCollectionState } from "../recoil-state/product-state";

export default function CollectionPage() {

  let { collectionId } = useParams();

  let id = 1;
  if (collectionId) {
    id = Number(collectionId);
  }

  const [curentCategoryId, setcurentCategoryId] = React.useState(id);
  const collectionList = useRecoilValue(collectionPublicListState);
  const productListByCollection = useRecoilValue(productsByCollectionState(curentCategoryId));

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setcurentCategoryId(value);
  };

  let isHomepage = false;
  let marginTopValue = "43px";
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/index/checkout") {
    isHomepage = true;
    marginTopValue = "0px";
  }

  return (
    <Box sx={{ width: "100%" }}>
      {!isHomepage && <Header title="Danh mục sản phẩm" />}
      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={curentCategoryId}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{ marginTop: marginTopValue }}
        >
          {collectionList.map((collection : any) => (
            <Tab
              key={collection.id}
              value={Number(collection.id)}
              label={collection.name}
            />
          ))}
        </Tabs>
      </Box>

      <Box>
        <ProductList listProduct={productListByCollection} />
      </Box>
    </Box>
  );
}