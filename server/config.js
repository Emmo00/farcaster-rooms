/**
 * IMPORTANT (PLEASE READ THIS):
 *
 * This is not the "configuration file" of mediasoup. This is the configuration
 * file of the mediasoup-demo app. mediasoup itself is a server-side library, it
 * does not read any "configuration file". Instead it exposes an API. This demo
 * application just reads settings from this file (once copied to config.js) and
 * calls the mediasoup API with those settings when appropriate.
 */

const os = require('os');

module.exports =
{
	// Listening hostname for browser app Vite development server.
	domain : process.env.DOMAIN || 'localhost',
	// configs for frontend
	frontend:
	{
		buildDir: "../build",
	},
	// Signaling settings (protoo WebSocket server and HTTP API server).
	https  :
	{
		listenIp   : '0.0.0.0',
		// NOTE: Don't change listenPort (client app assumes 4443).
		listenPort : process.env.PROTOO_LISTEN_PORT || 4443,
		// NOTE: Set your own valid certificate files.
		// (optional) if tls is not set, it will use http instead
		tls        :
		{
			cert : process.env.HTTPS_CERT_FULLCHAIN || `${__dirname}/certs/server.crt`,
			key  : process.env.HTTPS_CERT_PRIVKEY || `${__dirname}/certs/server.key`
		}
	},
	// database settings
	database:
	{
		uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/farcaster-rooms',
	},
	// mediasoup settings.
	mediasoup :
	{
		// Number of mediasoup workers to launch.
		numWorkers     : 1, // Object.keys(os.cpus()).length,
		// mediasoup WorkerSettings.
		// See https://mediasoup.org/documentation/v3/mediasoup/api/#WorkerSettings
		workerSettings :
		{
			dtlsCertificateFile : process.env.WORKER_CERT_FULLCHAIN,
			dtlsPrivateKeyFile  : process.env.WORKER_CERT_PRIVKEY,
			logLevel : 'warn',
			logTags  :
			[
				'info',
				'ice',
				'dtls',
				'rtp',
				'srtp',
				'rtcp',
				'rtx',
				'bwe',
				'score',
				'simulcast',
				'svc',
				'sctp'
			],
			disableLiburing: false
		},
		// mediasoup Router options.
		// See https://mediasoup.org/documentation/v3/mediasoup/api/#RouterOptions
		routerOptions :
		{
			mediaCodecs :
			[
				{
					kind      : 'audio',
					mimeType  : 'audio/opus',
					clockRate : 48000,
					channels  : 2
				},
				{
					kind       : 'video',
					mimeType   : 'video/VP8',
					clockRate  : 90000,
					parameters :
					{
						'x-google-start-bitrate' : 1000
					}
				},
				{
					kind       : 'video',
					mimeType   : 'video/VP9',
					clockRate  : 90000,
					parameters :
					{
						'profile-id'             : 2,
						'x-google-start-bitrate' : 1000
					}
				},
				{
					kind       : 'video',
					mimeType   : 'video/h264',
					clockRate  : 90000,
					parameters :
					{
						'packetization-mode'      : 1,
						'profile-level-id'        : '4d0032',
						'level-asymmetry-allowed' : 1,
						'x-google-start-bitrate'  : 1000
					}
				},
				{
					kind       : 'video',
					mimeType   : 'video/h264',
					clockRate  : 90000,
					parameters :
					{
						'packetization-mode'      : 1,
						'profile-level-id'        : '42e01f',
						'level-asymmetry-allowed' : 1,
						'x-google-start-bitrate'  : 1000
					}
				}
			]
		},
		// mediasoup WebRtcServer options for WebRTC endpoints (mediasoup-client,
		// libmediasoupclient).
		// See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcServerOptions
		// NOTE: mediasoup-demo/server/lib/Room.js will increase this port for
		// each mediasoup Worker since each Worker is a separate process.
		webRtcServerOptions :
		{
			listenInfos :
			[
				{
					protocol         : 'udp',
					ip               : process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
					announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
					port             : 44444
				},
				{
					protocol         : 'tcp',
					ip               : process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
					announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
					port             : 44444
				}
			]
		},
		// mediasoup WebRtcTransport options for WebRTC endpoints (mediasoup-client,
		// libmediasoupclient).
		// See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
		webRtcTransportOptions :
		{
			// listenInfos is not needed since webRtcServer is used.
			// However passing MEDIASOUP_USE_WEBRTC_SERVER=false will change it.
			listenInfos :
			[
				{
					protocol         : 'udp',
					ip               : process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
					announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
					portRange        :
					{
						min : process.env.MEDIASOUP_MIN_PORT || 40000,
						max : process.env.MEDIASOUP_MAX_PORT || 49999,
					}
				},
				{
					protocol         : 'tcp',
					ip               : process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
					announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
					portRange        :
					{
						min : process.env.MEDIASOUP_MIN_PORT || 40000,
						max : process.env.MEDIASOUP_MAX_PORT || 49999,
					}
				}
			],
			initialAvailableOutgoingBitrate : 1000000,
			minimumAvailableOutgoingBitrate : 600000,
			maxSctpMessageSize              : 262144,
			// Additional options that are not part of WebRtcTransportOptions.
			maxIncomingBitrate              : 1500000
		},
		// mediasoup PlainTransport options for legacy RTP endpoints (FFmpeg,
		// GStreamer).
		// See https://mediasoup.org/documentation/v3/mediasoup/api/#PlainTransportOptions
		plainTransportOptions :
		{
			listenInfo :
			{
				protocol         : 'udp',
				ip               : process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
				announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
				portRange        :
				{
					min : process.env.MEDIASOUP_MIN_PORT || 40000,
					max : process.env.MEDIASOUP_MAX_PORT || 49999,
				}
			},
			maxSctpMessageSize : 262144
		}
	}
};
