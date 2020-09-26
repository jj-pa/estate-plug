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

        // The number of datapoints
        const n = 21;

        // 5. X scale will use the index of our data
        const xScale = d3.scaleLinear()
            .domain([0, n-1]) // input
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
            .domain([0, 1]) // input 
            .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select('.' + name).append("svg")
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
        svg.append("path")
            .datum(dataset) // 10. Binds data to the line 
            .style('stroke', 'steelblue')
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d, i) { return xScale(i) })
            .attr("cy", function(d) { return yScale(d.y) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) { 
                    console.log(a) 
                this.attr('class', 'focus')
                })
            .on("mouseout", function() {  });
    }, 100);
}

export default draw;