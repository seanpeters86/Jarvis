var videos = {
	"ARCHIMONDE": "https://www.youtube.com/watch?v=Jkt1iId7Xbc",
	"MANNY": "https://www.youtube.com/watch?v=b7mTPw0pv20",
	"MANNOROTH": "https://www.youtube.com/watch?v=b7mTPw0pv20",
	"XHUL'HORAC": "https://www.youtube.com/watch?v=N2aSgC4DlIU",
	"XHUL": "https://www.youtube.com/watch?v=N2aSgC4DlIU",
	"TYRANT": "https://www.youtube.com/watch?v=wHUKGvI6U2Y",
	"FEL": "https://www.youtube.com/watch?v=d0C92xy1fts",
	"ISKAR": "https://www.youtube.com/watch?v=9iIAlJQ3Fws",
	"SOCRETHAR": "https://www.youtube.com/watch?v=cbO6Ri4XqlA",
	"GOREFIEND": "https://www.youtube.com/watch?v=OYOQ6ahRAc4",
	"GORE": "https://www.youtube.com/watch?v=OYOQ6ahRAc4",
	"KILROGG": "https://www.youtube.com/watch?v=37hyWu503zo",
	"COUNCIL": "https://www.youtube.com/watch?v=89wK24T2lK8",
	"KORMROK": "https://www.youtube.com/watch?v=KAnECqXw11c",
	"KORM": "https://www.youtube.com/watch?v=KAnECqXw11c",
	"IRON": "https://www.youtube.com/watch?v=8exVgQfHAaA",
	"REAVER": "https://www.youtube.com/watch?v=8exVgQfHAaA",
	"ASSAULT": "https://www.youtube.com/watch?v=FBKpYBYkZ5w",
	"HANS": "https://www.youtube.com/watch?v=dCbk8OamUow",
	"FRANZ": "https://www.youtube.com/watch?v=dCbk8OamUow",
	"OREO": "https://www.youtube.com/watch?v=F8xwKWEci_I",
	"OREGORGER": "https://www.youtube.com/watch?v=F8xwKWEci_I",
	"GRUUL": "https://www.youtube.com/watch?v=zYs9iKxrUGU",
	"BEASTLORD": "https://www.youtube.com/watch?v=n3Jr61veZkQ",
	"DRINK1": "https://www.youtube.com/watch?v=b9yNli7FF5s",
	"DRINK2": "https://www.youtube.com/watch?v=1eyykDPeKME",
	"SIMCRAFT": "https://www.youtube.com/watch?v=HPkB56VWWDU",
	"SIMC": "https://www.youtube.com/watch?v=HPkB56VWWDU",
	"WCL": "https://www.youtube.com/watch?v=91jG59QyN2k",
	"WARCRAFTLOGS": "https://www.youtube.com/watch?v=91jG59QyN2k",
	"PAWN": "https://www.youtube.com/watch?v=EnjnOGBn6qI"
};

module.exports = {
	get_video: function(parsedReg) {
		try {
			return videos[parsedReg[1]];
		} catch (err) {
			console.log(err);
			return 0;
		}
	}
};
