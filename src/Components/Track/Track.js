import React from 'react';
import './Track.css';
import * as WebPlayer from '../../../public/web-player'

class Track extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentlyPlaying: false,
            trackPaused: false,
            trackInProgress: false
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.togglePlayPreview = this.togglePlayPreview.bind(this);
        // this.audioEnded = this.audioEnded.bind(this);
        this.renderPreviewIcon = this.renderPreviewIcon.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.resumeTrack = this.resumeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) { //track in playlist side
            return <a className="removeTrack" onClick={this.removeTrack}>-</a>
        }

        else if(this.props.isCleanSlate){

            if (this.props.track.uri == WebPlayer.spotify_uri_num){
                if(!this.state.trackPaused)
                return(
                    <div className='buttons'>
                        <a className="addTrack" onClick={this.addTrack}>+</a>
                        <a className="pauseButton" onClick={this.pauseTrack}>PAUSE</a>
                    </div>
                )
                else{
                    return(
                        <div className='buttons'>
                            <a className="addTrack" onClick={this.addTrack}>+</a>
                            <a className="resumeButton" onClick={this.resumeTrack}>RESUME</a>
                        </div>
                    )
                }
            }
            else{
                return(
                    <div className='buttons'><a className="addTrack" onClick={this.addTrack}>+</a>
                    <a className="playButton" onClick={this.playTrack}><i className="fas fa-play"></i></a>
                    </div>
                )
            }
        }  
        
    }

    // Adds this.props.track as an argument to the addTrack method in App.js
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    // Adds this.props.track as an argument to the removeTrack method in App.js
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    playTrack(){
        console.log(WebPlayer.deviceID);
        this.props.clean(true);
        WebPlayer.playTrack(WebPlayer.deviceID, this.props.track.uri);
        this.setState({
            trackPaused: false,
            trackInProgress: true
        });        
    }
    pauseTrack(){
        //this.props.clean(false);
        WebPlayer.pauseTrack();
        this.setState({
            trackPaused: true
        })
    }
    resumeTrack(){
        WebPlayer.resumeTrack();
        this.setState({
            trackPaused: false
        })
    }

    togglePlayPreview() {
        const audio = this.refs.audio;
        if (!this.state.currentlyPlaying) {
            audio.play();
            this.setState({ 
                currentlyPlaying: true, 
            });
        } else {
            audio.pause();
            this.setState({ 
                currentlyPlaying: false,
            });
        }
    }

    renderPreviewIcon() {
        if(this.props.track.preview) {
            if (!this.state.currentlyPlaying) {
                return (
                    <i  className="fa fa-play Track-preview-icon" 
                        aria-hidden="true" 
                        onClick={this.togglePlayPreview}></i>
                );
            } else {
                return (
                        <i  className="fa fa-pause Track-preview-icon" 
                            aria-hidden="true" 
                            onClick={this.togglePlayPreview}></i>
                );
            }
        } else {
            return <p className="Track-preview-unavailable">No <br/> Preview <br />Available</p>
        }
    }

    render() {
        return(
            <div className="Track" key={this.props.track.id}>
                <div className="Track-cover-preview">
                    <audio ref="audio" src={this.props.track.preview} onEnded={() => this.setState({ currentlyPlaying: false })}></audio>
                    <div className="Track-preview-container">
                        {this.renderPreviewIcon()}
                    </div>
                    <img className="Track-album-cover" src={this.props.track.cover} alt="album cover"/>
                </div>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;