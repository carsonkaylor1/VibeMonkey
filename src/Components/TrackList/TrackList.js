import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            slateIsClean: true
        }
        this.cleanSlate = this.cleanSlate.bind(this);
    }

    cleanSlate(value){
        console.log(value);
        this.setState({
            slateIsClean: value
        });
    }

    render() {
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track   key={track.id}
                                        track={track}
                                        onAdd={this.props.onAdd}
                                        onRemove={this.props.onRemove}
                                        isRemoval={this.props.isRemoval}
                                        tracks={this.props.tracks}
                                        clean={this.cleanSlate}
                                        isCleanSlate={this.state.slateIsClean}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList;