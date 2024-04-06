import dynamic from "next/dynamic";
import { useState } from "react";
import Script from "next/script";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "../../../public/charting_library/charting_library";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  interval: "15" as ResolutionString,
  library_path: "/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
  custom_css_url: '/styles/tradingview.css',
};

const TVChartContainer = dynamic(
  () =>
    import("../tradingViewCharts").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

 function TradingChart() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  return (
    <>
      <Script
        src="/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && (
        <div className="h-full flex flex-col p-1 sm:p-2 cardShadowBor rounded-b-[16px] border-l border-r border-b dark:bg-[#012732]">
        <TVChartContainer {...defaultWidgetProps} />
        </div>
      )}
    </>
  );
}

export default TradingChart;
