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
            d.price = +d.price;
        });

        // Scale the range of the data in the domains
        let x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        let y = d3.scaleLinear()
            .range([height, 0]);
        x.domain(data.map(function(d) { return d.year_month; }));
        y.domain([0, d3.max(data, function(d) { return d.price; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .on("click", function (d) {
                d3.selectAll('.' + name + ' ' + '.bar').style('fill', '#2296F3');
                d3.select(this).style("fill", "#012B4E");
            }) // 클릭 이벤트 색상
            .attr("x", function(d) { return x(d.year_month); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.price); })
            .attr("height", function(d) { return height - y(d.price); });

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