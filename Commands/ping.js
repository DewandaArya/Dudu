exports.run = (client, message, args) => {
	message.reply(`Pinging.`).then(m => {
		setTimeout(() => {
			m.edit(`Pinging..`).then(m2 => {
				setTimeout(() => {
					m2.edit(`Pinging...`).then(m3 => {
						setTimeout(() => {
							m3.edit("Pinging.").then(m4 => {
								setTimeout(() => {
									m4.edit("Pinging..").then(m5 => {
										setTimeout(() => {
											m5.edit(`Pinging...`).then(m6 => {
												setTimeout(() => {
													m6.edit(`⏱| **${client.ws.ping}ms** Latency!`)
												}, 456);
											});
										}, 456);
									});
								}, 456);
							});
						}, 456);
					});
				}, 456);
			});
		}, 456);
	});
};

exports.name = "ping"