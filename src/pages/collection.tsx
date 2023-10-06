import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

import ProductList from "../components/productList";

import { useRecoilValue } from "recoil";
import { collectionPublicListState } from "../recoil-state/collection-state";
import { productsByCollectionState } from "../recoil-state/product-state";

import { useParams } from "react-router";
import { useLocation } from 'react-router-dom';
import { Header } from "zmp-ui";

export default function CollectionPage() {
  let { collectionId } = useParams();

  let id = 1;

  if (collectionId) {
    id = Number(collectionId);
  }

  const [curentCategoryId, setcurentCategoryId] = React.useState(id);

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setcurentCategoryId(value);
  };

  const collectionList = useRecoilValue(collectionPublicListState);
  const productListByCollection = useRecoilValue(
    productsByCollectionState(curentCategoryId)
  );

  const location = useLocation();

  let isHomepage = false;
  let marginTopValue = "43px";

  if (location.pathname === "/") {
    isHomepage = true;
    marginTopValue = "0px";
  }

  return (
    <Box sx={{ width: "100%" }}>
      {!isHomepage && <Header />}
      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={curentCategoryId}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{ marginTop: marginTopValue }}
        >
          {collectionList.map((collection) => (
            <Tab
              key={collection.id}
              value={collection.id}
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
