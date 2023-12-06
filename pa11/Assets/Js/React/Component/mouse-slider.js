class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [], // Initialize with an empty array
            mouseDownAt: 0,
            prevPercentage: 0,
            nextPercentage: 0,
        };
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/AlignTheDeveloper/MemeData/main/imageGallery.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData) => {
                console.log("Fetched data:", jsonData);
                this.setState({ originalData: jsonData });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    handleMouseDown = (e) => {
        this.setState({ mouseDownAt: e.clientX });
    }

    handleMouseMove = (e) => {
        if (this.state.mouseDownAt === 0) return;

        const mouseDelta = this.state.mouseDownAt - e.clientX;
        const maxDelta = window.innerWidth * 2;
        let percentage = (mouseDelta / maxDelta) * -100;
        let nextPercentage = this.state.prevPercentage + percentage;

        // boundaries
        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, -100); 
        
        this.setState({ nextPercentage });
    }

    handleMouseUp = () => {
        this.setState({
            mouseDownAt: 0,
            prevPercentage: this.state.nextPercentage,
        });
    }

    render() {
        const { nextPercentage, originalData } = this.state;

        return (
            <div 
                id="image-track"
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                style={{ transform: `translateX(${nextPercentage}%)` }}
            >
                {originalData.map((image, index) => (
                    <div key={index} className="image-container">
                        <img className="image" src={image.src} draggable="false" />
                        <div className="image-metadata">
                            <p>Author: {image.author}</p>
                            <p>Date: {image.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

ReactDOM.render(<ImageGallery originalData={[]} />, document.getElementById('imageGalleryContainer'));
