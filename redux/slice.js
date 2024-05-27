const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  swSubscription:null,
  rfqProducts: [],
  rfqVendors: [],
  rfqFormData: {
    is_published: 1,
    comment: "",
    response_email: "",
    contact_name: "",
    contact_number: "",
    location: "",
    bid_end_date: "",
    company_name: "",
  },
};

export const rfqProductsSlice = createSlice({
  name: "rfqProducts",
  initialState,
  reducers: {
    addRfqProduct: (state, action) => {
      let alreadyExistsProduct = state.rfqProducts.filter(
        (item) => item.product_id == action.payload.product_id
      );
      let data = {
        product_id: action.payload.product_id,
        name: action.payload.product_name,
        spec: [
          {
            title: "Size",
            value: "",
          },
          {
            title: "Spec",
            value: "",
          },
          {
            title: "Quantity",
            value: "",
          },
        ],
        vendors: [],
        comment: "",
        datasheet: "0",
        datasheet_file: "",
        spec_file: "",
        qap: "0",
        qap_file: "",
      };
      if (alreadyExistsProduct.length <= 0) {
        state.rfqProducts.push(data);
      }
    },
    removeRfqProduct: (state, action) => {
      if (action?.payload?.product_id) {
        let alreadyExistsProduct = state.rfqProducts.filter(
          (item) => item.product_id != action.payload.product_id
        );
        state.rfqProducts = alreadyExistsProduct;
      }
    },
    addProductSpecValue: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          if (item.spec.length > 0) {
            item.spec.map((specItem) => {
              if (specItem.title == action.payload.title) {
                specItem.value = action.payload.value;
              }
              return specItem;
            });
          }
        }
        return item;
      });
      state.rfqProducts = d;
    },
    addFiles: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          item[action.payload.type] = action.payload.value;
        }
        return item;
      });
      state.rfqProducts = d;
    },
    addComment: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          item.comment = action.payload.value;
        }
        return item;
      });
      state.rfqProducts = d;
    },
    addDatasheet: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          item.datasheet = action.payload.value;
        }
        return item;
      });
      state.rfqProducts = d;
    },
    addQAP: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          item.qap = action.payload.value;
        }
        return item;
      });
      state.rfqProducts = d;
    },
    addVendor: (state, action) => {
      let d = state.rfqProducts.map((item) => {
        if (item.product_id == action.payload.product_id) {
          if (item.vendors.length > 0) {
            let existsVendor = item.vendors.filter((vendor) => {
              if (vendor.user_id == action.payload.id) {
                return vendor;
              }
            });
            if (existsVendor.length > 0) {
            } else {
              item.vendors.push({
                user_id: action.payload.id,
                name: action.payload.name,
              });
            }
          } else {
            item.vendors.push({
              user_id: action.payload.id,
              name: action.payload.name,
            });
          }
        }
        return item;
      });
      state.rfqProducts = d;
    },
    setRfqFormData: (state, action) => {
      state.rfqFormData = action.payload;
    },
    clearState: (state, action) => {
      state.rfqFormData = initialState.rfqFormData;
      state.rfqProducts = initialState.rfqProducts;
      state.rfqVendors = initialState.rfqVendors;
    },
    setSwSubscription: (state, action) => {
      state.swSubscription = action.payload;
    },
  },
});
export const {
  addRfqProduct,
  addProductSpec,
  addProductSpecValue,
  addFiles,
  addComment,
  addDatasheet,
  addVendor,
  setRfqFormData,
  clearState,
  addQAP,
  removeRfqProduct,
  setSwSubscription
} = rfqProductsSlice.actions;

export default rfqProductsSlice.reducer;
