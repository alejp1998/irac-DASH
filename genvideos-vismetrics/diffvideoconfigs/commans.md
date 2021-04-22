# ORIGINAL VIDEO - cleanbandit-ratherbe.mp4

# LOW 
## LOW - cleanbandit-ratherbe-low.264
x264 --output cleanbandit-ratherbe-low.264 --preset slow --bitrate 100 --vbv-maxrate 4800 --vbv-bufsize 9600 --min-keyint 48 --keyint 48 --scenecut 0 --no-scenecut --pass 1 --video-filter "resize:width=160,height=90" cleanbandit-ratherbe.mp4

## LOW MP4 - cleanbandit-ratherbe-low.mp4
MP4Box -add cleanbandit-ratherbe-low.264 -fps 24 cleanbandit-ratherbe-low.mp4

# MEDIUM
## MEDIUM - cleanbandit-ratherbe-medium.264
x264 --output cleanbandit-ratherbe-medium.264 --preset slow --bitrate 600 --vbv-maxrate 4800 --vbv-bufsize 9600 --min-keyint 48 --keyint 48 --scenecut 0 --no-scenecut --pass 1 --video-filter "resize:width=640,height=360" cleanbandit-ratherbe.mp4

## MEDIUM MP4 - cleanbandit-ratherbe-medium.mp4
MP4Box -add cleanbandit-ratherbe-medium.264 -fps 24 cleanbandit-ratherbe-medium.mp4

# HIGH 
##HIGH - cleanbandit-ratherbe-high.264
x264 --output cleanbandit-ratherbe-high.264 --preset slow --bitrate 2400 --vbv-maxrate 4800 --vbv-bufsize 9600 --min-keyint 48 --keyint 48 --scenecut 0 --no-scenecut --pass 1 --video-filter "resize:width=1280,height=720" cleanbandit-ratherbe.mp4

## HIGH MP4 - cleanbandit-ratherbe-high.mp4
MP4Box -add cleanbandit-ratherbe-high.264 -fps 24 cleanbandit-ratherbe-high.mp4