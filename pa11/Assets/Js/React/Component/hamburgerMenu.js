class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    closeMenu(e) {
        if (this.node && !this.node.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.closeMenu);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeMenu);
    }

    render() {
        return (
            <div ref={node => { this.node = node; }}>
                <div id="hamburger" onClick={this.toggleMenu}>
                    <h2><i class="fa-solid fa-bars"></i></h2>
                    <h4>menu</h4>
                </div>
                {this.state.isOpen && (
                    <nav id="navMenu">
                        <a href="/MemeDataTable.html" alt="Data Table">
                            <h6><i class="fa-solid fa-table"></i> DataTable</h6>
                        </a>
                        <a href="/graph1.html" alt="Graph 1">
                            <h6><i class="fa-solid fa-cloud"></i> Graph1</h6>
                        </a>
                        <a href="/graph2.html" alt="Graph 2">
                            <h6><i class="fa-solid fa-chart-simple"></i> Graph2</h6>
                        </a>
                    </nav>
                )}
            </div>
        );
    }
}

ReactDOM.render(<HamburgerMenu />, document.getElementById('hamburgerMenuContainer'));
