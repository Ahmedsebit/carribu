# Carribu explainer video

## Finished files

- `../exports/carribu-explainer-75s.mp4`: 75-second, 1920 x 1080 landscape video.
- `../exports/carribu-explainer-poster.png`: video poster / thumbnail.
- `../exports/carribu-explainer-captions.srt`: platform-upload captions.
- `../exports/carribu-explainer-captions.vtt`: browser caption track.
- `../exports/carribu-explainer-narration.mp3`: British female neural narration, voice only.
- `../exports/carribu-explainer-soundtrack.mp3`: the complete narration + music mix.

The MP4 uses H.264 video, 30 fps, YUV 4:2:0 and AAC audio. English captions are
burned into the video so it can also be watched without sound. Do not enable the
optional sidecar captions unless you want an additional platform caption layer.
The soundtrack combines synthetic narration with original soft instrumental
music. The music is lowered automatically beneath speech. No stock music,
third-party music samples or stock footage are used.

## Watch and inspect

With the existing website development server running, open
`http://127.0.0.1:5173/marketing/video/`.
The preview uses the actual exported MP4 and includes a readable transcript.
`scene.html` provides a separate, seekable source-animation preview.
Nothing plays automatically.

The video and preview assets are separate marketing documents. They are not
automatically included in the public website's production build.

## Story

| Time | Scene |
| --- | --- |
| 0-9 s | One connected school run |
| 9-20 s | An illustrated journey from home to school |
| 20-31 s | The family perspective |
| 31-42 s | The driver perspective |
| 42-55 s | The school admin perspective |
| 55-65 s | Roster preparation, a pilot and rollout |
| 65-75 s | Email-demo invitation and scannable QR |

`storyboard.json` contains the scene durations and narration script.
`timing.json` contains the fitted caption times. `scene.html`, `scene.js` and
`video.css` define the deterministic animation. The renderer sets the source
animation's `window.renderFrame(seconds)` for each frame after `window.videoReady`.
Fonts, illustration, QR and admin preview are reused from `../assets/`.

Editing these sources does not automatically regenerate the exported MP4,
narration or caption files; those must be rebuilt together to stay synchronized.

## Representation and distribution

The school-run sequence is illustrative, not live tracking.
Parent and driver screens are explicitly labeled concepts, not app screenshots.
Names, times, locations and student actions are examples.
The admin screenshot is the real interface rendered with synthetic demonstration
data and cropped for the video layout.

The narration was generated locally using **Kokoro v1.0, `bf_emma`**, a British
English female neural voice. Its native speaking-speed control was set to 0.9
for a calmer delivery; no pitch shifting or accent simulation was applied.
Speech was placed within the existing scenes and captions were retimed to match.
The voice is synthetic, not a human presenter or customer endorsement.

The original 80 BPM instrumental uses softly synthesized keys and warm sustained
chords. It is an original procedural composition made for this video, with no
external music recordings or samples. Sidechain ducking keeps the voice forward;
the stereo master targets -16 LUFS integrated and -1.5 dBTP before AAC encoding.

Speech inference uses `kokoro-onnx` 0.6.1 and the full-precision Kokoro v1.0
ONNX model, run locally on CPU. The model weights are Apache-2.0 licensed;
the inference package is MIT licensed. Model files are separate rendering tools,
not bundled website dependencies or public marketing assets.
Provenance: `hexgrad/Kokoro-82M` and
`thewh1teagle/kokoro-onnx`, release `model-files-v1.1`
(`kokoro-v1.0.onnx` and `voices-v1.0.bin`).

The QR prepares an email enquiry to the approved planned address
`hello@carribu.app`. The viewer still sends it in their own email app.
Configure and test that mailbox before public distribution. The website address
and phone number are intentionally omitted.

Location and notification limitations appear in the closing scene. No safety,
arrival-time or notification-delivery guarantee is made.
