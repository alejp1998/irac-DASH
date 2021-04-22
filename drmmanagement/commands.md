# TOOLS 
In order to use them, we must navigate tothe corresponding folder with the commands located inside Bento4-SDK-1-6-0-637/bin


## MP4DASH - Allows to encrypt the file when generating the DASH file, by using the option --encryption, therefore:
--encyption-key=[KID]:[KEY]

If we use MARLIN DRM with the following keys:
KEY = 87237D20A19F58A740C05684E699B4AA -> (base64) hyN9IKGfWKdAwFaE5pm0qg==
KID = A16E402B9056E371F36D348AA62BB749 -> (base64) oW5AK5BW43HzbTSKpiu3SQ==

### Example:
./mp4dash ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-low-fragmented.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-medium-fragmented.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-high-fragmented.mp4 -o ../../drmmanagement/mpd --encryption-key=A16E402B9056E371F36D348AA62BB749:87237D20A19F58A740C05684E699B4AAa

