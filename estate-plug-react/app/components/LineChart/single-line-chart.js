import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    setTimeout(() => {
        const name = props.name;
        d3.select('.' + name + ' > *').remove();
        d3.select('svg.' + name).remove();
        const data = props.data;
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const element = d3.select('.' + name).node();
        const width = element.getBoundingClientRect().width + margin.left + margin.right;
        const height = props.height - margin.top - margin.bottom;

        // 5. X scale will use the index of our data
        let xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        xScale.domain(data.map(function(d) { return d[props.xKey]; }));

        // 6. Y scale will use the randomly generate number 
        const yScale = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d[props.yKey]; }) - 10, d3.max(data, function(d) { return d[props.yKey]; })]) // input 
            .range([height, 0]); // output 

        // 7. d3's line generator
        const line = d3.line()
            .x(d => xScale(d[props.xKey]))
            .y(d => yScale(d[props.yKey]))
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 1. Add the SVG to the page and employ #2
        const svg = d3.select('.' + name).append("svg")
            .attr('class', name)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox','0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            .attr('preserveAspectRatio','xMinYMin')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        console.log(data.map(function(d) { return d[props.yKey]; }));
        svg.append("path")
            .datum(data) // 10. Binds data to the line 
            .style('stroke', 'steelblue')
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", d => xScale(d[props.xKey]))
            .attr("cy", d => yScale(d[props.yKey]))
            .attr("r", 5)
            .on("mouseover", function(a, b, c) { 
                    console.log(a) 
                this.attr('class', 'focus')
                })
            .on("mouseout", function() {  });
    }, 100);
}

export default draw;