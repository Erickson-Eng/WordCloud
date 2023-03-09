import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';


const WordCloud = () => {
    const ref = useRef();

    useEffect(() => {
        var fontFamily = "sans-serif";
        var fontScale = 5;
        var padding = 0;
        var height = 400;
        var width = 600;
        const rotate = () => 0;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // var fontScale = d3.scaleLinear()
        //     .domain([1, 10])
        //     .range([15, 50])
        //     .clamp(true);

        //var font = function (d) { return fontScale(d.size) + "px Impact"; };

        var data = [
            { text: "d3", size: 0.7 },
            { text: "javascript", size: 0.9 },
            { text: "visualization", size: 0.5 },
            { text: "data", size: 0.5 },
            { text: "analytics", size: 0.5 },
            { text: "cloud", size: 0.5 },
            { text: "chart", size: 0.5 },
            { text: "graph", size: 0.5 },
            { text: "machine learning", size: 0.5 },
            { text: "artificial intelligence", size: 0.5 }
        ];

        var layout = cloud()
            .size([width, height])
            .words(data)
            .padding(padding)
            .rotate(rotate)
            .font(fontFamily)
            .fontSize(function (d) { return Math.sqrt(d.size) * fontScale; })
            .on("end", draw);

        layout.start();

        function draw(words) {
            d3.select(ref.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-size", function (d) { return Math.sqrt(d.size) * fontScale + "px"; })
                .style("font-family", "Impact")
                .style("fill", function (d, i) { return color(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) { return d.text; });
        }
    }, []);

    return <div ref={ref} />;

}

export default WordCloud;