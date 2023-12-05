class Graph2 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            originalData: [],
            scatterData: []
        };
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/AlignTheDeveloper/MemeData/main/memeData.json")
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then(jsonData => {
          console.log("Fetched data:", jsonData);
        
          let scatterData = jsonData.map(entry => ({
              timeStamp: entry["Timestamp"],
              amusingMeme: entry["Which style of meme do you find the most amusing or interesting?"]
          }));

          this.setState({ originalData: jsonData, scatterData: scatterData });
        })
        .catch(error => console.error("Error fetching data:", error));
    }

    componentDidUpdate() {
        this.createScatter();
    }

    createScatter() {
        const { scatterData } = this.state;
        if (scatterData.length === 0) return;
    
        d3.select("#graph2").select("svg").remove();
    
        const container = d3.select("#graph2");
        const containerWidth = container.node().getBoundingClientRect().width;
        const aspectRatio = 3 / 4;
        const containerHeight = Math.min(containerWidth * aspectRatio, window.innerHeight);
    
        // Increased left margin to accommodate y-axis labels
        const margin = {top: 10, right: 50, bottom: 50, left: 250}; 
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        scatterData.forEach(d => {
            d.timeStampNumeric = new Date(d.timeStamp).getTime(); // Example conversion
        });
    
        const svg = container.append("svg")
          .attr("width", containerWidth)
          .attr("height", containerHeight)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        
    
        // X axis
        var x = d3.scaleLinear()
        .domain(d3.extent(scatterData, d => d.timeStampNumeric)) // Use extent to get min and max
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d/%Y "))); // Format ticks as dates
    
        // Y axis 
        var y = d3.scaleBand()
          .range([height, 0])
          .domain(scatterData.map(d => d.amusingMeme))
        svg.append("g").call(d3.axisLeft(y));
    
        // Add dots
        svg.selectAll("circle")
          .data(scatterData)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.timeStampNumeric); })
            .attr("cy", function (d) { return y(d.amusingMeme) + y.bandwidth() / 2; }) // Center the dot in the band
            .attr("r", 5)
            .style("fill", "#172a43");
    }
    

    render() {
        return (
            <React.Fragment>
                <div id="graph2"></div>
            </React.Fragment>
        );
    }
}

const container = document.getElementById("graph2");
const root = ReactDOM.createRoot(container);
root.render(<Graph2 />);
