class GlitchyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.headerRef = React.createRef();
        // Include numbers along with letters
        this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }

    handleMouseOver = event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    return this.characters[Math.floor(Math.random() * this.characters.length)];
                })
                .join("");

            if (iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }
            iterations += 1 / 4;
        }, 30);
    };

    componentDidMount() {
        const headerElement = this.headerRef.current;
        headerElement.dataset.value = this.props.text;
        headerElement.addEventListener('mouseover', this.handleMouseOver);
    }

    componentWillUnmount() {
        const headerElement = this.headerRef.current;
        headerElement.removeEventListener('mouseover', this.handleMouseOver);
    }

    render() {
        return (
            <h1 ref={this.headerRef}>{this.props.text}</h1>
        );
    }
}

ReactDOM.render(<GlitchyHeader text="GIMM 260 Data Narrative" />, document.getElementById('header-text'));
