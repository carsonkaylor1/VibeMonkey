const token = 'BQBwi9T2cwE6rxBYhuHarat2vTUFX-OPUTDZB3sjO4Z_C8LFRVZipiv_lZno3vg6RavcKM7pttHPLO8kXgyDRcsQXydUTMsiS8Y_d84Sdm8IdTpeXR3KP6PJoohR9GzSJWM4i9le8esiY0y8kMSixeg06XERNi9s2_ZP6Fgm5OzE1tfKV0_Y8Ic';
export let deviceID;
let player;
export let spotify_uri_num

window.onSpotifyPlayerAPIReady = () => {
    player = new Spotify.Player({
    name: 'Web Playback SDK Template',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.on('initialization_error', e => console.error(e));
  player.on('authentication_error', e => console.error(e));
  player.on('account_error', e => console.error(e));
  player.on('playback_error', e => console.error(e));

  // Playback status updates
  player.on('player_state_changed', state => {
    console.log(state)
    $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
    $('#current-track-name').text(state.track_window.current_track.name);
  });

  // Ready
  player.on('ready', data => {
    console.log('Ready with Device ID', data.device_id);
    deviceID = data.device_id;
    // Play a track using our new device ID
  });

  // Connect to the player!
  player.connect();
}

// Play a specified track on the Web Playback SDK's device ID
export function playTrack(device_id, spotify_uri) {
  spotify_uri_num = spotify_uri
  let data_info = '{\"uris\": [\"' + spotify_uri + '\"]}'
  console.log(data_info);
  console.log(spotify_uri);
  $.ajax({
   url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
   type: "PUT",
   data: data_info,
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + token );},
   success: function(data) { 
     console.log(data)
   }
  });
}

export function pauseTrack(){
  player.pause();
}

export function resumeTrack(){
  player.resume();
}
