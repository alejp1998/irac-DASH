# TOOLS 
In order to use them, we must navigate tothe corresponding folder with the commands located inside Bento4-SDK-1-6-0-637/bin

## MP4INFO - tool to display high level info about an MP4 file, including all tracks and codec details. 
The output can be human-readable text, or a JSON object.

### usage: mp4info [options] <input>
Options:
  --verbose:          show extended information when available
  --format <format>:  display the information in this format.
                      <format> is: text (default) or json
  --show-layout:      show sample layout
  --show-samples:     show sample details
  --show-sample-data: show sample data
  --fast:             skip some details that are slow to compute

### Example:
./mp4info  ../../genvideos-vismetrics/diffvideoconfigs/cleanbandit-ratherbe-medium.mp4


## MP4FRAGMENT - tool that creates a fragmented MP4 file from a non-fragmented one
Running the tool without any argument will print out a summary of the tool’s command line options and parameters.
The tool can also be used to re-fragement a file that’s already in fragmented-MP4 form. 
This can be useful if you need to fix certain defficiencies of a fragmented MP4 file, such as the lack of tdft boxes in fragment headers, or if you need to change the timescale.

### usage: mp4fragment [options] <input> <output>
options are:
  --verbosity <n> sets the verbosity (details) level to <n> (between 0 and 3)
  --debug enable debugging information output
  --quiet don't print out notice messages
  --fragment-duration <milliseconds> (default = automatic)
  --timescale <n> (use 10000000 for Smooth Streaming compatibility)
  --track <track-id or type> only include media from one track (pass a track ID, 'audio', 'video' or 'subtitles')
  --index (re)create the segment index
  --trim trim excess media in longer tracks
  --no-tfdt don't add 'tfdt' boxes in the fragments (may be needed for legacy Smooth Streaming clients)
  --force-i-frame-sync <auto|all> treat all I-frames as sync samples (for open-gop sequences)
    'auto' only forces the flag if an open-gop source is detected, 'all' forces the flag in all cases

### Example: 

- Low Quality Video Fragmentation
./mp4fragment ../../genvideos-vismetrics/diffvideoconfigs/cleanbandit-ratherbe-low.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-low-fragmented.mp4

- Medium Quality Video Fragmentation
./mp4fragment ../../genvideos-vismetrics/diffvideoconfigs/cleanbandit-ratherbe-medium.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-medium-fragmented.mp4

- High Quality Video Fragmentation
./mp4fragment ../../genvideos-vismetrics/diffvideoconfigs/cleanbandit-ratherbe-high.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-high-fragmented.mp4


## MP4DASH - tool that is used to package one or more MP4 media files into an MPEG DASH (and/or Smooth Streaming) presentation.
For an overview of MPEG DASH, and usage guide for mp4dash, please consult the MPEG DASH Overview page.
Running the tool without any argument will print out a summary of the tool’s command line options and parameters.

More detailed info on how to use it on : https://www.bento4.com/developers/dash/

### Usage: mp4-dash.py [options]  [ ...]

Each  is the path to a fragmented MP4 file, optionally prefixed
with a stream selector delimited by [ and ]. The same input MP4 file may be
repeated, provided that the stream selector prefixes select different streams.
Version 2.0.0 r632

Options:
  -h, --help            show this help message and exit
  -v, --verbose         Be verbose
  -d, --debug           Print out debugging information
  -o , --output-dir=
                        Output directory
  -f, --force           Allow output to an existing directory
  --mpd-name=
                        MPD file name
  --profiles=
                        Comma-separated list of one or more profile(s).
                        Complete profile names can be used, or profile aliases
                        ('live'='urn:mpeg:dash:profile:isoff-live:2011', 'on-
                        demand'='urn:mpeg:dash:profile:isoff-on-demand:2011',
                        'hbbtv-1.5='urn:hbbtv:dash:profile:isoff-live:2012')
  --no-media            Do not output media files (MPD/Manifests only)
  --rename-media        Use a file name pattern instead of the base name of
                        input files for output media files.
  --media-prefix=
                        Use this prefix for prefixed media file names (instead
                        of the default prefix "media")
  --init-segment=
                        Initialization segment name
  --no-split            Do not split the file into individual segment files
  --use-segment-list    Use segment lists instead of segment templates
  --use-segment-template-number-padding
                        Use padded numbers in segment URL/filename templates
  --use-segment-timeline
                        Use segment timelines (necessary if segment durations
                        vary)
  --min-buffer-time=
                        Minimum buffer time (in seconds)
  --max-playout-rate=
                        Max Playout Rate setting strategy for trick-play
                        support. Supported strategies: lowest:X
  --language-map=:[,...]
                        Remap language code  to . Multiple
                        mappings can be specified, separated by ','
  --always-output-lang  Always output an @lang attribute for audio tracks even
                        when the language is undefined
  --subtitles           Enable Subtitles
  --attributes=
                        Specify the attributes of a set of tracks. This option
                        may be used multiple times, once per attribute set.
  --smooth              Produce an output compatible with Smooth Streaming
  --smooth-client-manifest-name=
                        Smooth Streaming Client Manifest file name
  --smooth-server-manifest-name=
                        Smooth Streaming Server Manifest file name
  --smooth-h264-fourcc=
                        Smooth Streaming FourCC value for H.264 video
                        (default=H264) [some older players use AVC1]
  --hls                 Output HLS playlists in addition to MPEG DASH
  --hls-key-url=   HLS key URL (default: key.bin)
  --hls-master-playlist-name=
                        HLS master playlist name (default: master.m3u8)
  --hls-media-playlist-name=
                        HLS media playlist name (default: media.m3u8)
  --hls-iframes-playlist-name=
                        HLS I-Frames playlist name (default: iframes.m3u8)
  --hippo               Produce an output compatible with the Hippo Media
                        Server
  --hippo-server-manifest-name=
                        Hippo Media Server Manifest file name
  --use-compat-namespace
                        Use the original DASH MPD namespace as it was
                        specified in the first published specification
  --encryption-key=
                        Encrypt some or all tracks with MPEG CENC (AES-128),
                        where  specifies the KID(s) and Key(s) to
                        use, using one of the following forms: (1) :
                        or :: with  (and  if
                        specififed) as a 32-character hex string and 
                        either a 32-character hex string or the character '#'
                        followed by a base64-encoded key seed; or (2) @ where  is an expression of one
                        of the supported key locator schemes. Each entry may
                        be prefixed with an optional track filter, and
                        multiple  entries can be used, separated by
                        ','. (see online docs for details)
  --encryption-cenc-scheme=
                        MPEG Common Encryption scheme (cenc, cbc1, cens or
                        cbcs). (default: cenc)
  --encryption-args=
                        Pass additional command line arguments to mp4encrypt
                        (separated by spaces)
  --eme-signaling=
                        Add EME-compliant signaling in the MPD and PSSH boxes
                        (valid options are 'pssh-v0' and 'pssh-v1')
  --merge-keys          Merge all keys in a single set used for all
                         elements
  --marlin              Add Marlin signaling to the MPD (requires an encrypted
                        input, or the --encryption-key option)
  --marlin-add-pssh     Add an (optional) Marlin 'pssh' box in the init
                        segment(s)
  --playready           Add PlayReady signaling to the MPD (requires an
                        encrypted input, or the --encryption-key option)
  --playready-version=PLAYREADY_VERSION
                        PlayReady version to use (4.0, 4.1, 4.2, 4.3),
                        defaults to 4.0
  --playready-header=
                        Add a PlayReady PRO element in the MPD and a PlayReady
                        PSSH box in the init segments. The use of this option
                        implies the --playready option. The 
                        argument can be either: (1) the character '@' followed
                        by the name of a file containing a PlayReady XML
                        Rights Management Header () or a PlayReady
                        Header Object (PRO) in binary form,  or (2) the
                        character '#' followed by a PlayReady Header Object
                        encoded in Base64, or (3) one or more :
                        pair(s) (separated by '#' if more than one) specifying
                        fields of a PlayReady Header Object (field names
                        include LA_URL, LUI_URL and DS_ID)
  --playready-add-pssh  Store the PlayReady header in a 'pssh' box in the init
                        segment(s) [deprecated: this is now implicitly on by
                        default when the --playready or --playready-header
                        option is used]
  --playready-no-pssh   Do not store the PlayReady header in a 'pssh' box in
                        the init segment(s)
  --widevine            Add Widevine signaling to the MPD (requires an
                        encrypted input, or the --encryption-key option)
  --widevine-header=
                        Add a Widevine entry in the MPD, and a Widevine PSSH
                        box in the init segments. The use of this option
                        implies the --widevine option. The 
                        argument can be either: (1) the character '#' followed
                        by a Widevine header encoded in Base64, or (2) one or
                        more : pair(s) (separated by '#' if more
                        than one) specifying fields of a Widevine header
                        (field names include 'provider' [string], 'content_id'
                        [byte array in hex], 'policy' [string])
  --primetime           Add Primetime signaling to the MPD (requires an
                        encrypted input, or the --encryption-key option)
  --primetime-metadata=
                        Add Primetime metadata in a PSSH box in the init
                        segments. The use of this option implies the
                        --primetime option. The  argument can
                        be either: (1) the character '@' followed by the name
                        of a file containing the Primetime Metadata to use, or
                        (2) the character '#' followed by the Primetime
                        Metadata encoded in Base64
  --fairplay-key-uri=FAIRPLAY_KEY_URI
                        Specify the key URI to use for FairPlay Streaming key
                        delivery (only valid with --hls option)
  --clearkey            Add Clear Key signaling to the MPD (requires an
                        encrypted input, or the --encryption-key option))
  --clearkey-license-uri=CLEARKEY_LICENSE_URI
                        Specify the license/key URI to use for Clear Key (only
                        valid with --clearkey option)
  --exec-dir=
                        Directory where the Bento4 executables are located
                        (use '-' to look for executable in the current PATH)

### Example:
./mp4dash ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-low-fragmented.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-medium-fragmented.mp4 ../../genvideos-vismetrics/videosDASHprep-genmpd/cleanbandit-ratherbe-high-fragmented.mp4 -o ../../genvideos-vismetrics/videosDASHprep-genmpd/mpd