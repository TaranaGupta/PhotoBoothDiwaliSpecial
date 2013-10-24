PhotoBoothDiwaliSpecial
=======================

A webRTC project using socket.io and peer.js

Imagine being on a grey hound bus on christmas eve..that is how it feels being away from home on Diwali. Diwali for an Indian is sort of Christmas, Thanksgiving and 4th of July combined.

This time I decided to use the umbilical  cord of technology aka ‘Live Web’ to get in the spirit of Diwali with my friends and family sitting 8,000 miles away and made a Indian-istyle photo-booth for my midterm project using WebRTC & Peer.js(WebRTC is a free, open project that enables web browsers with Real-Time Communications (RTC) capabilities via simple Javascript APIs. PeerJS wraps the browser’s WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API).

The project uses user’s web camera for real-time communication and face-detection library to put on mask on users face , and both the videos are being projected on the same canvas element using client side JS every 330m/s.


User can select his favorite Indian deity mask & can click on canvas for different image effects and capture the image, which gets broadcasted to other user asynchronously using socket.io & is downloadable on both the ends.

The project is running on my amazon server right now. 

I am using compatibility.js (to enable across browser compatibility), pixastic.custom.js (for video effects), base64.js & canvas2image.js(to save image from html canvas element) and frontalface.js & jsfeat-min.js (for face detection).
