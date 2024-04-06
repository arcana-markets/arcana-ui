import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "../../../public/charting_library";
import arcanaStore from "@/stores/arcanaStore";
import { FullMarketData } from "@/utils/types";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
	const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { marketData }: FullMarketData | any = arcanaStore();
	
    useEffect(() => {
        if (!marketData?.market?.marketId) {
            console.log("Market ID is not available");
            return;
        }

		const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: marketData.market.marketId, // The widget uses ID
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
				"https://prod.arcana.markets/api/openbookv2/tv",
				undefined,
				{
					maxResponseLength: 1000,
					expectedOrder: "latestFirst",
				}
			),
			interval: '15' as ResolutionString,         
			container: chartContainerRef.current,
			library_path: '/charting_library/',
			locale: props.locale as LanguageCode,
			disabled_features: [
				'hide_left_toolbar_by_default',
				'use_localstorage_for_settings',
				'volume_force_overlay',
				// 'left_toolbar',
				// 'header_settings',
				'header_chart_type',
				'header_compare',
				'header_screenshot',
				'header_saveload',
				'header_undo_redo',
				// 'show_interval_dialog_on_key_press',
				'header_symbol_search',
			  ],
			enabled_features: [
				"study_templates",

			],
			charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
			fullscreen: props.fullscreen,
			autosize: props.autosize,
			loading_screen: {
			backgroundColor: "rgb(1, 39, 50)",
			foregroundColor: "rgb(1, 39, 50)",
			},
			overrides: {
				'paneProperties.background': '#012732',
				'paneProperties.legendProperties.showBackground': false,
				'paneProperties.legendProperties.showStudyTitles': false,
				'paneProperties.legendProperties.backgroundTransparency': true,
				'paneProperties.vertGridProperties.color': 'rgba(255,255,255,0.05)',
				'paneProperties.horzGridProperties.color': 'rgba(255,255,255,0.05)',
				'paneProperties.backgroundGradientStartColor': '#012732',
				'paneProperties.backgroundGradientEndColor': '#012732',
				'scalesProperties.backgroundColor': '#012732',
				'scalesProperties.lineColor': '#012A36',
				'scalesProperties.textColor': '#ffffff',
				'scalesProperties.fontSize': 11,
				'scalesProperties.showStudyLastValue': false,
			// OPTIONAL: candleStyles ~
				 'mainSeriesProperties.candleStyle.upColor': '#06D6A0',
				 'mainSeriesProperties.candleStyle.downColor': '#EF476F',
				 'mainSeriesProperties.candleStyle.drawWick': true,
				 'mainSeriesProperties.candleStyle.drawBorder': true,
				 'mainSeriesProperties.candleStyle.borderColor': '#4EDF87',
				 'mainSeriesProperties.candleStyle.borderUpColor': '#06D6A0',
				 'mainSeriesProperties.candleStyle.borderDownColor': '#EF476F',
				 'mainSeriesProperties.candleStyle.wickUpColor': '#06D6A0',
				 'mainSeriesProperties.candleStyle.wickDownColor': '#EF476F',
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			  },
			studies_overrides: {
				'volume.volume.color.0': '#EF476F',
				'volume.volume.color.1': '#06D6A0',
				'volume.precision': 6,
			  },
			  custom_css_url: '/styles/tradingview.css',
		};

		const tvWidget = new widget(widgetOptions);

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.classList.add("apply-common-tooltip");
				button.innerHTML = "Data by TradingView";
			
				// Add a click event listener to the button
				button.addEventListener('click', () => {
					// Open TradingView website in a new tab
					window.open('https://www.tradingview.com', '_blank');
				});
			});
			
			tvWidget.activeChart().createStudy(
				'Moving Average Exponential',
				true,
				false,
				{
					length: 7
				},
				{'Plot.color': '#ff9900'}
			);
			tvWidget.activeChart().createStudy(
				'Moving Average Exponential',
				true,
				false,
				{
					length: 25
				},
				{'Plot.color': '#cc0099'}
			);
			tvWidget.activeChart().createStudy(
				'Moving Average Exponential',
				true,
				false,
				{
					length: 99
				},
				{'Plot.color': '#3399ff'}
			);
		});
        // Cleanup function
        return () => {
            tvWidget.remove();
        };
    }, [marketData, props]); // Dependencies
    return (
        <div ref={chartContainerRef} className={styles.TVChartContainer} />
    );
};