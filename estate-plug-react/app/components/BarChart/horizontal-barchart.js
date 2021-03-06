import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    setTimeout(() => {
        const name = props.name;
        d3.select('.' + name + ' > *').remove();
        const data = props.data;
        const margin = {top: 20, right: 20, bottom: 30, left: 40};

        // const width = props.width - margin.left - margin.right;
        const element = d3.select('.' + name).node();
        // console.log(element.getBoundingClientRect().width);
        
        const width = element.getBoundingClientRect().width + margin.left + margin.right;
        
        const height = props.height - margin.top - margin.bottom;
        let svg = d3.select('.' + name).append('svg')
                // .attr('width',width + margin.left + margin.right)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox','0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                .attr('preserveAspectRatio','xMinYMin')
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // format the data
        data.forEach(function(d) {
            d[props.xKey] = +d[props.xKey];
        });

        // Scale the range of the data in the domains
        let x = d3.scaleLinear()
            .range([0, width]);
        let y = d3.scaleBand()
            .range([0, height])
            .padding(.1);
        // 0아닌 데이터의 최소 값 - 10으로 시작
        x.domain([d3.min(data, function(d) { return d[props.xKey]; }) - 10, d3.max(data, function(d) { return d[props.xKey]; })]);
        y.domain(data.map(function(d) { return d[props.yKey]; }));

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", x(d3.min(data, function(d) { return d[props.xKey]; }) - 10)) // 0이 아닌 데이터의 최소 값 - 10으로 시작
            .attr("y", function(d) { return y(d[props.yKey]); })
            .attr("width", function(d) { return x(d[props.xKey]); })
            .attr("height", y.bandwidth())
            .style("fill", "#69b3a2");

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }, 100);
}

export default draw;