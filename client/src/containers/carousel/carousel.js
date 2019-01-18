import React, {Component} from 'react';

class Carousel extends Component {
    state = {
        total: 0,
        current: 0
    }

    componentDidMount(){
        this.setState({
            total: this.props.photos.length,
            current: 0
        });
        this.interval = setInterval(this.showNext, 3000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    showNext = () => {
        const {total, current} = this.state;
        this.setState({
            current: current === total - 1 ? 0 : current + 1
        });
    }

    showImage = () => {
        const {current} = this.state;
        const currentPhoto = this.props.photos[current];
        return `${currentPhoto.prefix}300x300${currentPhoto.suffix}`;
    }

    render(){
        return(
            <div className="container-fluid carousel-wrapper">
                <img src={this.showImage()} alt="carousel" />
            </div>
        );
    }

}

export default Carousel;