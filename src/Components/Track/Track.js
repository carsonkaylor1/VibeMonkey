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
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.resumeTrack = this.resumeTrack.bind(this);
    }

    renderActionLeft(){
        if (this.props.isRemoval) { //track in playlist side
            return <a className="removeTrack" onClick={this.removeTrack}>-</a>
        }
        return(
            <a className="addTrack" onClick={this.addTrack}>+</a>
        )
    }


    renderAction() {
        if(this.props.isCleanSlate && !this.props.isRemoval){

            if (this.props.track.uri == WebPlayer.spotify_uri_num){
                if(!this.state.trackPaused)
                return(
                    <div className='buttons'>
                        <a className="pauseButton" onClick={this.pauseTrack}><i class="fas fa-pause"></i></a>
                    </div>
                )
                else{
                    return(
                        <div className='buttons'>
                            <a className="resumeButton" onClick={this.resumeTrack}><i className="fas fa-play"></i></a>
                        </div>
                    )
                }
            }
            else{
                return(
                    <div className='buttons'>
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

    render() {
        return(
            <div className="Track" key={this.props.track.id}>
                {this.renderActionLeft()}
                <div className="Track-cover-preview">
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