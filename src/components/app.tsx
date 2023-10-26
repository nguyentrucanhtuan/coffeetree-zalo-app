import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import Index from "../pages/index";
import CollectionPage from "../pages/collection";
import CheckoutPage from "../pages/checkout";
import ProfilePage from "../pages/profile";
import ProductPage from "../pages/product";
import CheckoutSuccessPage from "../pages/checkout_success";
import EditInfoPage from "../pages/edit_info";
import OrderListPage from "../pages/order_list";
import AppLoading from "./loading";

const MyApp = () => {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<AppLoading />}>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <AnimationRoutes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/collection" element={<CollectionPage />}></Route>
                <Route
                  path="/collection/:collectionId"
                  element={<CollectionPage />}
                ></Route>
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route
                  path="/checkout_success"
                  element={<CheckoutSuccessPage />}
                ></Route>
                <Route
                  path="/checkout_success/:orderId"
                  element={<CheckoutSuccessPage />}
                ></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route
                  path="/product/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="/editInfo" element={<EditInfoPage />}></Route>
                <Route path="/orderList" element={<OrderListPage />}></Route>
              </AnimationRoutes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </React.Suspense>
    </RecoilRoot>
  );
};
export default MyApp;
