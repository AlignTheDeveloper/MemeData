class Graph2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        originalData: [],
        wordData: []
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
          // Process the data to get word counts
          let wordCounts = {};
          jsonData.forEach(entry => {
            let memeStyle = entry["Which style of meme have you encountered the most?"];
            if (memeStyle) {
              wordCounts[memeStyle] = (wordCounts[memeStyle] || 0) + 1;
            }
          });
          let wordData = Object.keys(wordCounts).map(key => {
            return { text: key, size: wordCounts[key] };
          });
          this.setState({ originalData: jsonData, wordData: wordData });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  
    componentDidUpdate() {
      this.createWordCloud();
    }
  
    createWordCloud() {
        const { wordData } = this.state;
        if (wordData.length === 0) return;
      
        d3.select("#graph2").select("svg").remove();
      
        const container = d3.select("#graph2");
        const containerWidth = container.node().getBoundingClientRect().width;
        const containerHeight = Math.max(containerWidth, 450);
      
        const svg = container.append("svg")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
          .append("g")
          .attr("transform", `translate(${containerWidth / 2},${containerHeight / 2})`);
      
        const layout = d3.layout.cloud()
          .size([containerWidth, containerHeight])
          .words(wordData.map(d => ({ text: d.text, size: d.size * 10 }))) // Adjust size scaling as needed
          .padding(10)
          .fontSize(d => d.size)
          .on("end", draw);
        layout.start();
      
        function draw(words) {
          svg.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("fill", "#172a43")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
            .text(d => d.text)

        }
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
  