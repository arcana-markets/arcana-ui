import React from 'react';
import styles from './index.module.css';
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget, LibrarySymbolInfo, ISymbolValueFormatter, SeriesFormatterFactory } from "../../../../public/charting_library";
import arcanaStore from "@/stores/arcanaStore";
import { FullMarketData } from "@/utils/types";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
	const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { marketData }: FullMarketData | any = arcanaStore();

	function createPriceFormatter(): SeriesFormatterFactory {
		return (symbolInfo: LibrarySymbolInfo | null, minTick: string): ISymbolValueFormatter | null => {
		  if (!symbolInfo) return null;
		  return {
			format: (price: number): string => {
			  let suffix = '';
			  let dividedPrice = price;
	  
			  if (price >= 1000000000) {
				suffix = 'B';
				dividedPrice = price / 1000000000;
			  } else if (price >= 1000000) {
				suffix = 'M';
				dividedPrice = price / 1000000;
			  } else if (price >= 1000) {
				suffix = 'K';
				dividedPrice = price / 1000;
			  }
	  
			  const priceString = dividedPrice.toString();
			  const [integerPart, rawDecimalPart] = priceString.split(".");
			  const decimalPlaces = rawDecimalPart && /^0+[1-9]/.test(rawDecimalPart) ? 6 : 4;
			  const formattedPrice = dividedPrice.toFixed(decimalPlaces);
			  const [_, decimalPart] = formattedPrice.split(".");
			  
			  if (!decimalPart) {
				return `${integerPart}${suffix}`;
			  }
			  
			  const firstNonZeroIndex = decimalPart.search(/[^0]/);
			  if (firstNonZeroIndex === -1) {
				return `${integerPart}${suffix}`;
			  }
			  
			  const leadingZerosCount = firstNonZeroIndex;
			  const significantDigits = decimalPart.substring(firstNonZeroIndex);
	  
			  return `${integerPart}.` +
					 `${'0'.repeat(leadingZerosCount)}` +
					 `${significantDigits}${suffix}`;
			}
		  };
		};
	  };

	  function createTimeFormatter() {
		return {
		  format: (date: Date): string => {
			let hours = date.getUTCHours().toString().padStart(2, '0');
			let minutes = date.getUTCMinutes().toString().padStart(2, '0');
			let seconds = date.getUTCSeconds().toString().padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		  },
		  formatLocal: (date: Date): string => {
			let hours = date.getHours().toString().padStart(2, '0');
			let minutes = date.getMinutes().toString().padStart(2, '0');
			let seconds = date.getSeconds().toString().padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		  },
		  parse: (dateString: string) => {
			// Assume dateString is in UTC time format "HH:MM:SS"
			return dateString;  // Directly return the string assuming it's properly formatted
		  }
		};
	  }

	  function createDateFormatter() {
		return {
		  format: (date: Date): string => {
			let year = date.getUTCFullYear();
			let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
			let day = date.getUTCDate().toString().padStart(2, '0');
			return `${year}/${month}/${day}`;
		  },
		  formatLocal: (date: Date): string => {
			let year = date.getFullYear();
			let month = (date.getMonth() + 1).toString().padStart(2, '0');
			let day = date.getDate().toString().padStart(2, '0');
			return `${year}/${month}/${day}`;
		  },
		  parse: (dateString: string) => {
			// Assume dateString is in local date format "YYYY/MM/DD"
			return dateString;  // Directly return the string assuming it's properly formatted
		  }
		};
	  }

	function formatPriceWithSupSub(price: number | null) {
		if (price == null) return '';
	  
		const priceString = price.toString();
		const [integerPart, rawDecimalPart] = priceString.split(".");
		const hasLeadingZeros = rawDecimalPart && /^0+[1-9]/.test(rawDecimalPart);
		const decimalPlaces = hasLeadingZeros ? 6 : 2;
		const formattedPrice = price.toFixed(decimalPlaces);
		const [_, decimalPart] = formattedPrice.split(".");
	  
		if (!decimalPart) {
		  return integerPart;
		}
	  
		const firstNonZeroIndex = decimalPart.search(/[^0]/);
		if (firstNonZeroIndex === -1) {
		  return integerPart;
		}
	  
		const leadingZerosCount = firstNonZeroIndex;
		const significantDigits = decimalPart.substring(firstNonZeroIndex);
	  
		return (
		  `${integerPart}.` +
		  (leadingZerosCount > 0 ? `<sub>${'0'.repeat(leadingZerosCount)}</sub>` : '') +
		  `${significantDigits}`
		);
	  }

    useEffect(() => {
        if (!marketData?.market?.marketId) {
            console.log("Market ID is not available");
            return;
        }

		const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: marketData.market.marketId, // The widget uses ID
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
				// 'header_screenshot',
				'header_saveload',
				// 'header_undo_redo',
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
			  custom_formatters: {
				priceFormatterFactory: createPriceFormatter(),
				timeFormatter: createTimeFormatter(),
				dateFormatter: createDateFormatter()
			},	
		};

		const tvWidget = new widget(widgetOptions);

		tvWidget.onChartReady(() => {
			const yAxisLabelInterval = setInterval(() => {
			  const yAxisLabels = document.querySelectorAll('.tv-yaxis-labels .tv-yaxis-label__text');
			  yAxisLabels.forEach(label => {
				// Check if the textContent is not null before replacing commas and parsing
				if (label.textContent) {
				  const originalValue = parseFloat(label.textContent.replace(/,/g, ''));
				  const formatted = formatPriceWithSupSub(originalValue);
				  const tempDiv = document.createElement('div');
				  tempDiv.innerHTML = formatted;
				  label.innerHTML = '';
				  // Check if the first child of tempDiv is not null before appending
				  if (tempDiv.firstChild) {
					label.appendChild(tempDiv.firstChild);
				  }
				}
			  });
			}, 1000);
			return () => {
			  clearInterval(yAxisLabelInterval);
			};
		  });

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
		});
        return () => {
            tvWidget.remove();
        };
    }, [marketData, props]);
    return (
        <div ref={chartContainerRef} className={styles.TVChartContainer} />
    );
};