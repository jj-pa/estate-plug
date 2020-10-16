import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    setTimeout(() => {
        const name = props.name;
        d3.select('.' + name + ' > *').remove();
        d3.select('svg.' + name).remove();
        
        const data = props.data;

        console.log('1.-------------------');
        console.log(props.data);
        console.log('2.-------------------');
        // console.log(data);
        // console.log('3.-------------------');

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const element = d3.select('.' + name).node();
        const width = element.getBoundingClientRect().width + margin.left + margin.right;
        const height = props.height - margin.top - margin.bottom;
        var duration = 250;

        var lineOpacity = "0.25";
        var lineOpacityHover = "0.85";
        var otherLinesOpacityHover = "0.1";
        var lineStroke = "1.5px";
        var lineStrokeHover = "2.5px";

        var circleOpacity = '0.85';
        var circleOpacityOnLineHover = "0.25"
        var circleRadius = 3;
        var circleRadiusHover = 6;


        /* Format Data */
        // var parseDate = d3.timeParse("%Y");
        // date가 문자열 요소로 인식되어 파싱 ㄴ
        data.forEach(function (d) {
            d.values.forEach(function (d) {
                d.date = d.date;
                d.price = +d.price;
            });
        });

        /* Scale */
        var xScale = d3.scaleTime()
            .domain(d3.extent(data[0].values, d => d.date))
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data[0].values, d => d.price)])
            .range([height, 0]);

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        /* Add SVG */
        var svg = d3.select('.' + name).append("svg")
            .attr('class', name)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /* Add line into SVG */
        var line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.price));
        let lines = svg.append('g')
            .attr('class', 'lines');

        lines.selectAll('.line-group')
            .data(data).enter()
            .append('g')
            .attr('class', 'line-group')
            .on("mouseover", function (d, i) {
                svg.append("text")
                    .attr("class", "title-text")
                    .style("fill", 'white')
                    .text(i.name)
                    .attr("text-anchor", "middle")
                    .attr("x", (width) / 2)
                    .attr("y", 5);
            })
            .on("mouseout", function (d) {
                svg.select(".title-text").remove();
            })
            .append('path')
            .attr('class', 'line')
            .attr('d', d => line(d.values))
            .style('stroke', (d, i) => color(i))
            .style('opacity', lineOpacity)
            .on("mouseover", function (i, d) {
                d3.selectAll('.line')
                    .style('opacity', otherLinesOpacityHover);
                d3.selectAll('.circle')
                    .style('opacity', circleOpacityOnLineHover);
                d3.select(this)
                    .style('opacity', lineOpacityHover)
                    .style("stroke-width", lineStrokeHover)
                    .style("cursor", "pointer");
            })
            .on("mouseout", function (d) {
                d3.selectAll(".line")
                    .style('opacity', lineOpacity);
                d3.selectAll('.circle')
                    .style('opacity', circleOpacity);
                d3.select(this)
                    .style("stroke-width", lineStroke)
                    .style("cursor", "none");
            });


        /* Add circles in the line */
        lines.selectAll("circle-group")
            .data(data).enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data(d => d.values).enter()
            .append("g")
            .attr("class", "circle")
            .on("mouseover", function (i, d) {
                d3.select(this)
                    .style("cursor", "pointer")
                    .append("text")
                    .attr("class", "text")
                    .text(`${d.price}`)
                    .attr("x", d => xScale(d.date) + 5)
                    .attr("y", d => yScale(d.price) - 10);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("cursor", "none")
                    .transition()
                    .duration(duration)
                    .selectAll(".text").remove();
            })
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.price))
            .attr("r", circleRadius)
            .style('opacity', circleOpacity)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadiusHover);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadius);
            });


        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append('text')
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#fff")
            .text("Total values");
    }, 100);
}

export default draw;