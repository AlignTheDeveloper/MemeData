class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDownAt: 0,
            prevPercentage: 0,
            nextPercentage: 0,
        };
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
        
        this.setState({ nextPercentage});
        
    }

    handleMouseUp = () => {
        this.setState({
            mouseDownAt: 0,
            prevPercentage: this.state.nextPercentage,
        });
    }

    render() {
        const { nextPercentage } = this.state;

        return (
            <div 
                id="image-track"
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                style={{ transform: `translateX(${nextPercentage}%)` }}
            >
                <img class="image" src="/Assets/Pics/Image Track/ourleader.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/ancientegypt.jpg"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-middle-school.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/DALLE_2023-09-05_13.06.34_-_visual_novel.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/DALLE_2023-09-05_14.19.01_-_sea_serpent_with_human_head.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/soldier-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-the-tin-man.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-but-Vi-LOL.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/lorem-peace.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/sans.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/handsome-jack.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Krajack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/The_Savior.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/TonySoprano.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jackinthebox.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/captain-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/never-let-go.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-jack.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Jackies.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jackies-fries.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/what-have-I-done.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/og-ball.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/allJack.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/vegas-dome-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/solarsystem-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/modokbutepic.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jacklexa.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/majoras_mask_jack_poster_shitpost_G260.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack_ball_roll.gif" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack_bike.gif" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/poke_steelblue.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/magmaorange.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/norm-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-shrine.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-eggman1.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-eggman2.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-eggman3.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jacksune-miku.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jackirby.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jackirby2.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Jack_Orb_of_POWER_Rotate_Small.gif" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/JackagamineRin.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/sad-jack.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Jacker.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Jack_Black.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jackzilla.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/ZooWeeMaMA.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/Jack_Skellington_260.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jorb.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/TheImageEver2.jpg" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/enlightened-jack.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/jack-duck.png" draggable= "false"/>
                <img class="image" src="/Assets/Pics/Image Track/lookatthisphotograph-jack.jpg" draggable= "false"/>
            </div>
        );
    }
}

ReactDOM.render(<ImageGallery />, document.getElementById('imageGalleryContainer'));

