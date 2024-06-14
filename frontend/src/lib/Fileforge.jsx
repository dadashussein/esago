import { compile } from "@fileforge/react-print";
import axios from "axios";
import { Provider } from "react-redux";
import Preview from "~/components/Preview";
import { store } from "~/store/store";

export const generatePDF = async () => {
  try {
    const HTML = await compile(
      <>
        <div style={{ page: "A4" }}>
          <Provider store={store}>
            <Preview />
          </Provider>
        </div>
      </>,
    );
    console.log(HTML);
    // const pdfOptions = {
    //     url: "https://api.pdfendpoint.com/v1/convert",
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer pdfe_live_bae617c9c642e7951d81ff4a458ebe180b5e"
    //     },
    //     data: JSON.stringify({
    //         html: HTML,
    //         sandbox: false,
    //         orientation: "vertical",
    //         page_size: "A4",
    //         margin_top: "2cm",
    //         margin_bottom: "2cm",
    //         margin_left: "2cm",
    //         margin_right: "2cm"
    //     })
    // };
    // const response = await axios(pdfOptions);
    // const downloadLink = response.data.data.url
    // window.open(downloadLink, "_blank");
  } catch (error) {
    console.error(error);
  }
};
