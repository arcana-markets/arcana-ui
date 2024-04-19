import Highcharts from 'highcharts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import arcanaStore from '@/stores/arcanaStore';
import { formatYAxis } from '@/utils/formatting';
import '@/app/data/css/marketDepth.css';

  interface TooltipFormatterContext {
    x: number;
    y: number;
  }

  interface AxisLabelsFormatterContext {
    value: number; // Assuming 'value' is a number
  }

  interface Order {
    price: number;
    size: number;
  }

  const DepthChart = () => {
    const { orderBookData } = arcanaStore((state) => state);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chart, setChart] = useState<any>(null);

      // Function to create placeholder orders
      const createPlaceholderOrders = (midpoint: number, type: 'bid' | 'ask') => {
        const placeholderOrders = [];
        const step = type === 'bid' ? -0.05 : 0.05;
        for (let i = 0; i < 5; i++) {
          const price = midpoint * (1 + step * i);
          placeholderOrders.push({ price, size: 0 });
        }
        return placeholderOrders;
      };
      
      const { sortedBids, sortedAsks, maxPrice, minPrice } = useMemo(() => {
        if (!orderBookData) {
          return { sortedBids: [], sortedAsks: [], maxPrice: null, minPrice: null };
        }
      
          const processOrders = (orders: Order[], isBid: boolean) => {
            // Sort orders and accumulate size
            const sortedOrders = orders.sort((a, b) => isBid ? b.price - a.price : a.price - b.price);
            let cumulativeSize = 0;
            return sortedOrders.map(order => {
              cumulativeSize += order.size;
              return [order.price, cumulativeSize];
            });
          };

        // Assuming createPlaceholderOrders returns an array of Order objects
        const bidOrders = orderBookData.market?.bidOrders.length > 0
          ? orderBookData.market?.bidOrders
          : createPlaceholderOrders(orderBookData.midpoint, 'bid');
        const askOrders = orderBookData.market?.askOrders.length > 0
          ? orderBookData.market?.askOrders
          : createPlaceholderOrders(orderBookData.midpoint, 'ask');

        const sortedBids = processOrders(bidOrders, true);
        const sortedAsks = processOrders(askOrders, false);

        // Determine max and min prices for xAxis
        const maxBidPrice = sortedBids[0][0];
        const minAskPrice = sortedAsks[0][0];
        const maxPrice = Math.max(maxBidPrice, minAskPrice * 1.1);
        const minPrice = Math.min(minAskPrice, maxBidPrice * 0.9);

        const sortedBidsForHighcharts = [...sortedBids].reverse();


        return { 
          sortedBids: sortedBidsForHighcharts, 
          sortedAsks, // no need for 'sortedAsksForHighcharts' as asks are already in ascending order
          maxPrice, 
          minPrice 
        };
      }, [orderBookData]);
  
      useEffect(() => {
        if (chartRef.current && !chart) {
          const chartId = 'depth-chart-' + Math.random().toString(36).substring(2, 11);
          chartRef.current.setAttribute('id', chartId); // Set the ID of the chart container
          const newChart = Highcharts.chart(chartId, { // Use the generated ID when creating the chart
        // Default values for an empty order book
            accessibility: {
              enabled: true, // Set accessibility enabled
            },
              chart: {
              type: 'area',
              zoomType: 'xy',
            },
            title: {
              text: '',
            },
            xAxis: {
              min: minPrice,
              max: maxPrice,
              minPadding: 0,
              maxPadding: 0,
              plotLines: [{
                color: '#FFFFFF', // Color of the X-axis plot line
                value: orderBookData?.midpoint,
                width: 2,
                label: {
                  align: 'center',
                  style: {
                    color: '#FFFFFF',
                    opacity: '100'
                  }
                }
              }],
              title: {
                text: 'Price',
                style: {
                  color: 'rgba(255, 255, 255, 0.8)' // White color with 50% opacity
                }
              },
              labels: {
                style: {
                  color: 'rgba(255, 255, 255, 0.5)' // White color with 50% opacity
                }
              },
            },
            yAxis: [
              {
                color: '',
                lineWidth: 1,
                gridLineWidth: 0,
                tickWidth: 1,
                tickLength: 5,
                tickPosition: 'inside',
                labels: {
                  align: 'left',
                  x: 12,
                  y: -12,
                  width: 2,
                  style: {
                    color: '',
                    opacity: '100' // Set label color
                  },
                  formatter: function(this: AxisLabelsFormatterContext) {
                    return formatYAxis(this.value);
                  }
                },
                title: {
                  text: ''
                },
                plotLines: [{ // Optional: Add this if you need a plot line on the yAxis
                  color: 'blue', // Color of the plot line
                  value: orderBookData?.midpoint, // Set the value where the line will be drawn
                  width: 2,
                  label: {
                    align: 'center',
                    style: {
                      color: 'blue' // Color of the label text on the plot line
                    }
                  }
                }]
              },
              {
                opposite: true,
                linkedTo: 0,
                lineWidth: 1,
                gridLineWidth: 0,
                title: null,
                tickWidth: 1,
                tickLength: 5,
                tickPosition: 'inside',
                labels: {
                  align: 'right',
                  x: 8,
                  style: {
                    color: 'white' // Set label color for the opposite Y-axis
                  }
                }
              }
            ],
          legend: {
            enabled: false,
          },
          plotOptions: {
            area: {
              fillOpacity: 0.5,
              lineWidth: 1,
              step: 'center',
              marker: {
                enabled: false, // Disable point markers for a smoother appearance
              },
            },
          },
            tooltip: {
              headerFormat:
              '<span style="font-size=10px;">Price:{point.key}</span><br/>',
              valueDecimals: 2,
              formatter: function (this: TooltipFormatterContext): string {
                return `Price: ${this.x}<br>Size: ${this.y}`;
              }
            },
            series: [{
              name: 'Bids',
              data: sortedBids,
              color: '#06D6A0',
              step: 'left' // This ensures the step line chart correctly represents bid data
            }, {
              name: 'Asks',
              data: sortedAsks,
              color: '#EF476F',
              step: 'right' // This ensures the step line chart correctly represents ask data
            }],                
            // Additional configuration options
          });
          setChart(newChart);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chart, chartRef, maxPrice, minPrice, sortedBids, sortedAsks]); // Ensure dependencies are updated


  // Update the chart data when orderBookData changes
  useEffect(() => {
    if (chart) {
      chart.series[0].setData(sortedBids); // Bids should be reversed for Highcharts
      chart.series[1].setData(sortedAsks); // Asks are already in ascending order
      chart.xAxis[0].setExtremes(minPrice, maxPrice);
    }
  }, [chart, sortedBids, sortedAsks, maxPrice, minPrice]);  
  return <div ref={chartRef} className="h-[200px] md:h-[220px] w-full" />;
};

export default DepthChart;
