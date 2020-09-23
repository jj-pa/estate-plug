import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    setTimeout(() => {

        const name = props.name;
        d3.select('.' + name + ' > *').remove();
        d3.select('svg.' + name).remove();
        // define data
        let dataset = [
            {label: "Assamese", count: 13},
            {label: "Bengali", count: 83},
            {label: "Bodo", count: 1.4},
            {label: "Dogri", count: 2.3},
            {label: "Gujarati", count: 46},
            {label: "Hindi", count: 300},
            {label: "Kannada", count: 38},
            {label: "Kashmiri", count: 5.5},
            {label: "Konkani", count: 5},
            {label: "Maithili", count: 20},
            {label: "Malayalam", count: 33},
            {label: "Manipuri", count: 1.5},
            {label: "Marathi", count: 72},
            {label: "Nepali", count: 2.9},
            {label: "Oriya", count: 33},
            {label: "Punjabi", count: 29},
            {label: "Sanskrit", count: 0.01},
            {label: "Santhali", count: 6.5},
            {label: "Sindhi", count: 2.5},
            {label: "Tamil", count: 61},
            {label: "Telugu", count: 74},
            {label: "Urdu", count: 52}
        ];

        // chart dimensions
        const element = d3.select('.' + name).node();
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        let width = element.getBoundingClientRect().width + margin.left + margin.right;
        let height = props.height - margin.top - margin.bottom;;

        // a circle chart needs a radius
        let radius = Math.min(width, height) / 2;

        // legend dimensions
        let legendRectSize = 12; // defines the size of the colored squares in legend
        let legendSpacing = 9; // defines spacing between squares

        // define color scale
        let categorical = [
            { "name" : "schemeAccent", "n": 8},
            { "name" : "schemeDark2", "n": 8},
            { "name" : "schemePastel2", "n": 8},
            { "name" : "schemeSet2", "n": 8},
            { "name" : "schemeSet1", "n": 9},
            { "name" : "schemePastel1", "n": 9},
            { "name" : "schemeCategory10", "n" : 10},
            { "name" : "schemeSet3", "n" : 12 },
            { "name" : "schemePaired", "n": 12},
            { "name" : "schemeCategory20", "n" : 20 },
            { "name" : "schemeCategory20b", "n" : 20},
            { "name" : "schemeCategory20c", "n" : 20 }
          ];
        let color = d3.scaleOrdinal(d3[categorical[0].name]);
        // more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

        let svg = d3.select('.' + name) // select element in the DOM with id 'chart'
            .append('svg') // append an svg element to the element we've selected
            .attr('class', name)
            .attr('width', width - 100) // set the width of the svg element we just added
            .attr('height', height) // set the height of the svg element we just added
            .attr('viewBox','0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            // .attr('preserveAspectRatio','xMinYMin')
            .append('g') // append 'g' element to the svg element
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            // .attr('transform', 'translate(' + width * 1 / 4 + ',' + height * 2 / 5 + ')');
            // .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')'); // our reference is now to the 'g' element. centerting the 'g' element to the svg element

        let arc = d3.arc()
            .innerRadius(0) // none for pie chart
            .outerRadius(radius); // size of overall chart

        let pie = d3.pie() // start and end angles of the segments
            .value(function(d) { return d.count; }) // how to extract the numerical data from each entry in our dataset
            .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

        // define tooltip
        let tooltip = d3.select('.' + name) // select element in the DOM with id 'chart'
            .append('div') // append a div element to the element we've selected                                    
            .attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

        tooltip.append('div') // add divs to the tooltip defined above                            
            .attr('class', 'label'); // add class 'label' on the selection                         

        tooltip.append('div') // add divs to the tooltip defined above                     
            .attr('class', 'count'); // add class 'count' on the selection                  

        tooltip.append('div') // add divs to the tooltip defined above  
            .attr('class', 'percent'); // add class 'percent' on the selection

        // Confused? see below:

        // <div id="chart">
        //   <div class="tooltip">
        //     <div class="label">
        //     </div>
        //     <div class="count">
        //     </div>
        //     <div class="percent">
        //     </div>
        //   </div>
        // </div>

        dataset.forEach(function(d) {
            d.count = +d.count; // calculate count as we iterate through the data
            d.enabled = true; // add enabled property to track which entries are checked
        });

        // creating the chart
        let path = svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
            .data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
            .enter() //creates placeholder nodes for each of the values
            .append('path') // replace placeholders with path elements
            .attr('d', arc) // define d attribute with arc function above
            .attr('fill', function(d) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
            .each(function(d) { this._current - d; }); // creates a smooth animation for each track

        // mouse event handlers are attached to path so they need to come after its definition
        path.on('mouseover', function(event, d) {  // when mouse enters div     
            d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
                let total = d3.sum(dataset.map(function(d) { // calculate the total number of tickets in the dataset         
                return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
            }));                                 

            console.log(d);
            let percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
            tooltip.select('.label').html(d.data.label); // set current label           
            tooltip.select('.count').html('$' + d.data.count); // set current count            
            tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
            tooltip.style('display', 'block'); // set display                     
            tooltip.style('position', 'absolute');                     
        });                                                     

        path.on('mouseout', function() { // when mouse leaves div                        
            tooltip.style('display', 'none'); // hide tooltip for that element
            d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '1');
        });

        path.on('mousemove', function(event) { // when mouse moves                  
            tooltip.style('top', (event.layerY + 10) + 'px') // always 10px below the cursor
                .style('left', (event.layerX + 10) + 'px'); // always 10px to the right of the mouse
        });

        // define legend
        let legend = svg.selectAll('.legend') // selecting elements with class 'legend'
            .data(color.domain()) // refers to an array of labels from our dataset
            .enter() // creates placeholder
            .append('g') // replace placeholders with g elements
            .attr('class', 'legend') // each g is given a legend class
            .attr('transform', function(d, i) {                   
                let height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
                let offset =  height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                let horz = 23 * legendRectSize; // the legend is shifted to the left to make room for the text
                let vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                return 'translate(' + horz + ',' + vert + ')'; //return translation       
            });

        // adding colored squares to legend
        legend.append('rect') // append rectangle squares to legend                                   
            .attr('width', legendRectSize) // width of rect size is defined above                        
            .attr('height', legendRectSize) // height of rect size is defined above                      
            .style('fill', color) // each fill is passed a color
            .style('stroke', color) // each stroke is passed a color
            .on('click', function(label) {
                let rect = d3.select(this); // this refers to the colored squared just clicked
                let enabled = true; // set enabled true to default
                let totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
                    return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
                }));

                if (rect.attr('class') === 'disabled') { // if class is disabled
                    rect.attr('class', ''); // remove class disabled
                } else { // else
                    if (totalEnabled < 2) return; // if less than two labels are flagged, exit
                    rect.attr('class', 'disabled'); // otherwise flag the square disabled
                    enabled = false; // set enabled to false
                }

                pie.value(function(d) { 
                    if (d.label === label) d.enabled = enabled; // if entry label matches legend label
                        return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
                });

                path = path.data(pie(dataset)); // update pie with new data

                path.transition() // transition of redrawn pie
                    .duration(750) // 
                    .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
                        let interpolate = d3.interpolate(this._current, d); // this = current path element
                        this._current = interpolate(0); // interpolate between current value and the new value of 'd'
                        return function(t) {
                            return arc(interpolate(t));
                        };
                    });
            });

        // adding text to legend
        legend.append('text')                                    
            .attr('x', legendRectSize + legendSpacing)
            // .attr('y', legendRectSize - legendSpacing)
            .attr('y', legendRectSize)
            .text(function(d) { return d; }); // return label
    }, 100);
}

export default draw;