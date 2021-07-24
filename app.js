'use strict';

const RB = ReactBootstrap;
const drumPads = [
    {
        keyCode: 81,
        text: 'Q',
        name: 'Bass Drum',
        url: './sounds/bass-drum.mp3'
    },
    {
        keyCode: 87,
        text: 'W',
        name: 'Drum Sticks',
        url: './sounds/drum-sticks.mp3'
    },
    {
        keyCode: 69,
        text: 'E',
        name: 'Floor Tom Drum',
        url: './sounds/floor-tom-drum.mp3'
    },
    {
        keyCode: 65,
        text: 'A',
        name: 'HH Closed',
        url: './sounds/hi-hat-closed.mp3'
    },
    {
        keyCode: 83,
        text: 'S',
        name: 'HH Foot',
        url: './sounds/hi-hat-foot.mp3'
    },
    {
        keyCode: 68,
        text: 'D',
        name: 'HH Open',
        url: './sounds/hi-hat-open.mp3'
    },
    {
        keyCode: 90,
        text: 'Z',
        name: 'Medium Tom Drum',
        url: './sounds/medium-tom-drum.mp3'
    },
    {
        keyCode: 88,
        text: 'X',
        name: 'Small Tom Drum',
        url: './sounds/small-tom-drum.mp3'
    },
    {
        keyCode: 67,
        text: 'C',
        name: 'Snare Drum',
        url: './sounds/snare-drum.mp3'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: ''
        };

        this.updateDisplay = this.updateDisplay.bind(this);
    }

    updateDisplay(text) {
        this.setState({ displayText: text })
    }

    render() {
        return (
            <RB.Container id="drum-machine" className="mt-5">
                <RB.Row>
                    <RB.Col md={6} sm={12}>
                        <DrumMachine
                            pads={drumPads}
                            updateDisplay={this.updateDisplay}
                        />
                    </RB.Col>
                    <RB.Col md={6} sm={12}>
                        <Display text={this.state.displayText} />
                    </RB.Col>
                </RB.Row>
            </RB.Container>
        );
    }
}

const DrumMachine = (props) => {
    return (
        <RB.Row xs={3}>
            {
                props.pads.map(pad => {
                    return <DrumPad 
                        pad={pad} 
                        key={pad.keyCode} 
                        updateDisplay={props.updateDisplay} 
                    />;
                })
            }
        </RB.Row>
    );
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.handlePadClick = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
  
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.keyCode == this.props.pad.keyCode) {
            this.playSound();
        }
    }

    playSound() {
        const audio = document.getElementById(this.props.pad.text);
        audio.play();
        audio.currentTime = 0;
        this.props.updateDisplay(audio.getAttribute('data-name'));
    }

    render() {
        return (
            <RB.Button
                variant="secondary"
                size="lg"
                className='drum-pad'
                onClick={this.handlePadClick}
                id={this.props.pad.name}
            >
                {this.props.pad.text}
                <RB.Form.Control as='audio'
                    src={this.props.pad.url} type="audio/mpeg"
                    className="clip"
                    id={this.props.pad.text}
                    data-name={this.props.pad.name}
                />
            </RB.Button>
        );
    }
}

const Display = (props) => {
    return (
        <RB.Row>
            <RB.Col 
                md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}
                className="text-center">
                <RB.Form.Label
                    id="display"
                    plaintext
                    readOnly
                >{props.text}</RB.Form.Label>
            </RB.Col>
        </RB.Row>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);