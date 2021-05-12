const crypto = require("crypto");
var CryptoJS = require("crypto-js");

const randomValue = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('')

const urlKey = new URL('http://127.0.0.1:6200/getPublicKey');
const urlDRM = new URL('http://127.0.0.1:6200/getDRMKey?key=first');

let decryptedKey; 
let decryptedKid;

fetch(urlKey, {
}).then(res => {
	 res.json().then((data) => {
	 const publicKey = data.key;
	 const buffer = Buffer.from(randomValue.toString("utf-8"), 'utf8');
	 console.log("Buffer: " + buffer);
	 const encryptedValue = crypto.publicEncrypt(publicKey, buffer);
	 const JsonData = JSON.stringify({encryptedValue : encryptedValue});
	 fetch(urlDRM, { 
	 	 method: 'POST',
	 	 mode: 'cors',
 		 body: JsonData,
  		 headers:{
    			'Accept': 'application/json',
      			'Content-Type': 'application/json'
		}}).then(res => {
			res.json().then((data) => {
				console.log("Petition send, waiting for response");
				console.log(data);
				decryptedKey = CryptoJS.AES.decrypt(data.key,randomValue).toString(CryptoJS.enc.Utf8);
				decryptedKid = CryptoJS.AES.decrypt(data.kid,randomValue).toString(CryptoJS.enc.Utf8);
				    var video,player,mpd_url = "./mpd/stream.mpd";
				    
				    const KEY = decryptedKey;
				    const KID = decryptedKid;

				    const protData = {
					"org.w3.clearkey": {
					    "clearkeys": {
						decryptedKid : decryptedKey
					    }
					}
				    };
				    
				    console.log("Decrypted Kid: "+ decryptedKid);
				    console.log("Decrypted Key: "+ decryptedKey);

				    video = document.querySelector("video");

				    player = dashjs.MediaPlayer().create();
				    player.setProtectionData(protData);
				    player.initialize(video, mpd_url, true);
				    player.on(dashjs.MediaPlayer.events["PLAYBACK_ENDED"], function() {
					clearInterval(eventPoller);
				    });
				  

				    var eventPoller = setInterval(function() {
					var streamInfo = player.getActiveStream().getStreamInfo();
					var dashMetrics = player.getDashMetrics();
					var dashAdapter = player.getDashAdapter();
				    
					if (dashMetrics && streamInfo) {
					    const periodIdx = streamInfo.index;
					    
					    var repSwitch = dashMetrics.getCurrentRepresentationSwitch('video', true);
					    var bufferLevel = dashMetrics.getCurrentBufferLevel('video', true);
					    
					    var bitrate = repSwitch ? Math.round(dashAdapter.
						getBandwidthForRepresentation(repSwitch.to,
						periodIdx) / 1000) : NaN;
					    
					    document.getElementById('buffer').innerText = bufferLevel + " secs";
					    document.getElementById('bitrate').innerText = bitrate + " Kbps";
					    document.getElementById('representation').innerText = repSwitch.to;
					}
				    }, 500);

		})
		})
	 })
		
})
